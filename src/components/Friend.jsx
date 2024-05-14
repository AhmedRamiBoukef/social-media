import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ isFollowed,friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
 // const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = isFollowed;

  const patchFriend = async () => {
    if (!isFollowed) {
      const response = await fetch(
        `http://localhost:8000/user/follow`,
        {
          method: "POST",
          body:JSON.stringify({
            "followingId": friendId
            
            
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }else {
      const response = await fetch(
        `http://localhost:8000/user/unfollow`,
        {
          method: "POST",
          body:JSON.stringify({
            "followingId": friendId
            
            
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {fullname}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {username}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
