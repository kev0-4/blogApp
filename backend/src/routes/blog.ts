import { createBlogInput, updateBlogInput } from "@kevin-sym/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// authMiddleware
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  try {
    const response = await verify(header, c.env.JWT_SECRET);
    if (response.id) {
      // c.set("userId", user.id);
      c.set("userId", String(response.id));
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    return c.json({
      message: "you are not logged in",
    });
  }
});

// post blogs
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = createBlogInput.safeParse(body)
  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(c.get("userId")),
    },
  });
  return c.json({
    id: blog.id,
  });
});

// update blogs
blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = updateBlogInput.safeParse(body)
  if (!success) {
    c.status(411);
    return c.json({
      message: "Incorrect inputs",
    });
  }
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

// get blogs by id
blogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      msg: "Error occured",
    });
  }
});

// get all blogs
// FUTURE _ ADD PAGENATION
// if you send req/change as ../blog/bulk it will be routed to ":id" one
blogRouter.get("/bulk/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: { name: true },
      },
      
    },
  });
  return c.json({
    blogs,
  });
});

export default blogRouter;
