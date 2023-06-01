import { memo } from "react";
import { useSelector } from "react-redux";
import { selectById } from "../store/reducers/postSlice";
import { selectByIdUsers } from "../store/reducers/userSlice";

interface PostProps {
  postId: string | number;
}

const Post = ({ postId }: PostProps) => {
  const post = useSelector((state) => selectById(state, postId));
  const user = useSelector(store=>selectByIdUsers(store, post.userId))
  console.log("post component:", postId);

  if (!post) {
    return null; // Render null or loading indicator if post is not found
  }
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h6>{user?.name}</h6>
    </div>
  )
}

//*** memo use kalama component eke data change unoth witharai re render wenne map karadii. component eka memorize wenwa
// export default memo(Post)
export default Post