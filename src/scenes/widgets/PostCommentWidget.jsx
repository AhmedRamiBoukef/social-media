  import {
      Button,
    Divider,
    InputBase,
    useTheme,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  
  const PostCommentWidget = ({ picturePath,post_id }) => {
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);

  
    const handlePost = async () => {
      const response = await fetch(`http://localhost:8000/commentPost`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        body: JSON.stringify({ content: post, post_id: post_id }),
      });
      const posts = await response.json();
      
      setImage(null);
      setPost("");
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`} />
          <InputBase
            placeholder="Write a comment..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                color: palette.primary.dark,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                }}
            >
            POST
        </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostCommentWidget;
  