import { Appbar } from "../components/App";
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
          {blogs.map((blog) => (
            <BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="22"/>
          ))}
        </div>
      </div>
    </div>
  );
};
