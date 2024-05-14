import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false, isSave = false  }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8000/getrecent/?page=1", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/getrecent?page=1`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };
  

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    console.log("posts:",posts);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts && posts.map(
        (post) => (
          <PostWidget
            key={post.post_id}
            postId={post.post_id}
            //postUserId={post.user.user_id}
            //name={post.user.full_name}
            description={post.content}
            //username={post.user.username}
            picturePath={"p13.jpeg"}
            userPicturePath={"p13.jpeg"}
            likes={post.nb_likes}
            isLiked={post.is_liked}
            isSaved={post.is_saved}
            nb_comments={post.nb_comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
