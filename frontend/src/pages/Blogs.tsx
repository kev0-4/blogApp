import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-3xl">
          {//@ts-ignore
          blogs.map((blog) => (
            <BlogCard id={blog.id}  authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="22"/>
          ))}
        </div>
      </div>
    </div>
  );
};
