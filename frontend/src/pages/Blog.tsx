
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";


export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center"></div>
                <Spinner />
            </div>
        </div>
    }
    return <div>
     
        <FullBlog  blog={blog || {
    content: "string",
    title: "string",
    id: 0,
    author: {
      name: "string",
    },
    publishedDate: "string"
  } }/>
    </div>
}

