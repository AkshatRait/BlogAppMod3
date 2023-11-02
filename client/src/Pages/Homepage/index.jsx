import { useContext } from "react"
import Timeline from "../../Components/Timeline"
import "./index.css"
import { primaryContext } from "../../Context/PrimaryProvider"
import PostPage from "../Post"

const HomePage = () => {

const {addingPost,setAddingPost} = useContext(primaryContext)


  return (
      <div id="homepage">
        {addingPost ? <PostPage /> : <Timeline />}
    </div>
  )
}

export default HomePage