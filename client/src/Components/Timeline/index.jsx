import { useContext } from "react"
import CreatePost from "../CreatePost"
import "./index.css"
import { primaryContext } from "../../Context/PrimaryProvider"
import Post from "../Post"

const Timeline = () => {

    
    const { posts } = useContext(primaryContext)
console.log(posts);
  return (
    <div id="timeline">
        <CreatePost />
        <div className="posts">
          {posts.map((post)=>{
            return <Post post={post}/>
          })}
        </div>
    </div>
  )
}

export default Timeline