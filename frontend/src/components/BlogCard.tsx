import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-300 pb-4 rounded-sm cursor-pointer">
        <div className="flex flex-col-2 ">
          <div>
            <Avatar name={authorName} size={"small"} />
          </div>
          <div className="flex flex-col justify-end text-l p-2 font-mono">
            {authorName}{" "}
          </div>
          <div className="flex flex-col justify-center text-l font-bold text-slate-600">
            .
          </div>
          <div className="text-slate-400 flex flex-col justify-end text-l p-2 font-mono">
            {publishedDate}
          </div>
        </div>
        <div className="pl-3">
          <div className="text-2xl font-semibold subpixel-antialiased font-mono hover:underline">
            {title}
          </div>
          <div className="text-l text-slate-600 subpixel-antialiased font-mono font-thin">
            {content.slice(0, 100) + "..."}
          </div>
          <div className="flex justify-start pb-2 pt-1">
            <div
              className="subpixel-antialiased text-xs  text-stone-100 font-mono border-solid border-1 border-stone-800 rounded-full px-2 py-1 inline-block"
              style={{
                background: "linear-gradient(to right, #555555, #333333)",
              }}
            >
              {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div className="pt-1">
      <div
        className={`relative inline-flex  items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
          size === "small" ? "w-8 h-8" : "w-10 h-10"
        }`}
      >
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-extralight text-gray-600 dark:text-gray-300`}
        >
          {name[0]}
        </span>
      </div>
    </div>
  );
}
