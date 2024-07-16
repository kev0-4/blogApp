import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link to={"/blogs"} className="cursor-pointer text-xl font-bold">
        Medium
      </Link>
      <div className="flex items-center">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 mt-2 text-white bg-green-700 hover:bg-green-800 
            focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
            text-sm px-3.5 py-2.5 text-center"
          >
            Publish
          </button>
        </Link>
        <Avatar size={"big"} name="harkirat" />
      </div>
    </div>
  );
};
