import {
  BookmarkBorder,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Bookmark
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import PostCommentWidget from "./PostCommentWidget";
import UserImage from "components/UserImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  username,
  picturePath,
  userPicturePath,
  isLiked,
  nb_comments,
  isSaved,
  likes

}) => {
  const [isComments, setIsComments] = useState(false);
  const [liked,setLiked] = useState(isLiked)
  const [saved,setSaved] = useState(isSaved)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [comments,setComments] = useState(null);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    if (!liked) {
      const response = await fetch(`http://localhost:8000/likepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });
    const updatedPost = await response.json();

    } else {
      const response = await fetch(`http://localhost:8000/unlikepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });
    const updatedPost = await response.json();

    }
    setLiked(!liked)
  };
  const patchSave = async () => {
    if (!saved) {
      const response = await fetch(`http://localhost:8000/savepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });
    const updatedPost = await response.json();

    } else {
      const response = await fetch(`http://localhost:8000/unsavepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });
    const updatedPost = await response.json();

    }
    setSaved(!saved)
  };

  const getComments = async () => {
    if (!isComments && comments === null) {
      const response = await fetch(`http://localhost:8000/getpostcomments?page_number=1&post_id=${postId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setComments(data.comments);
    }
    setIsComments(!isComments)
    
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={username}
        userPicturePath={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://source.unsplash.com/random/?sig=${postId}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {liked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likes}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => getComments()}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{nb_comments}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={patchSave}>
            {saved ? (
                <Bookmark sx={{ color: primary }} />
              ) : (
                <BookmarkBorder />
              )}
          
        </IconButton>
      </FlexBetween>
      {isComments && comments != null && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${comment.user.username}-${i}`}>
              <FlexBetween gap="1rem" my="0.5rem">
                <UserImage image={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`} />
                <Box>
                  <Typography
                    variant="h4"
                    color={palette.text.primary}
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {comment.user.username}
                  </Typography>
                </Box>
              </FlexBetween>
                <Typography m="0.5rem" color={palette.text.primary}>{comment.content}</Typography>
                <Divider/>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <Divider />
      <PostCommentWidget picturePath={userPicturePath} post_id={postId} />
    </WidgetWrapper>
  );
};

export default PostWidget;
