import { useContext } from "react"
import "./index.css"
import { primaryContext } from "../../Context/PrimaryProvider"
import Post from "../Post"

const Timeline = () => {

    
    const { posts } = useContext(primaryContext)
  return (
    <div id="timeline">
        <div className="posts">
          {posts.map((post)=>{
            return <Post key={[post]} post={post}/>
          })}
        </div>
    </div>
  )
}

export default Timeline