import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FriendListWidget = ({type,id}) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [friends, setFriends] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const getFollowings = async () => {
    const response = await fetch(
      `http://localhost:8000/user/followings`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setFollowings(data);
  };
  const getFollowers = async () => {
    const response = await fetch(
      `http://localhost:8000/user/followers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setFollowers(data);
  };
  const getFollowingsForUser = async () => {
    const response = await fetch(
      `http://localhost:8000/user/followings/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setFollowings(data);
  };
  const getFollowersForUser = async () => {
    const response = await fetch(
      `http://localhost:8000/user/followers/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setFollowers(data);
  };  const getFriends = async () => {
    const response = await fetch(`http://localhost:8000/allUsers`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    setFriends(data);
  };

  useEffect(() => {
    if (type==="home") {
      getFriends();
    getFollowings();
    }else {
      getFollowingsForUser();
      getFollowers()
    }
    
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredFriends = friends.filter(
    (friend) => !followings.some((following) => following.user_id === friend.user_id)
  );

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {type !== "home" ? "Followings" : "People you may know"}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {type === "home"
          ? filteredFriends.map((friend) => (
              <Friend
                isFollowed={false}
                key={friend.user_id}
                friendId={friend.user_id}
                name={friend.full_name}
                subtitle={friend.username}
                userPicturePath={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`}
              />
            ))
          : (followings.map((following) => (
              <Friend
                isFollowed={true} 
                key={following.user_id}
                friendId={following.user_id}
                name={following.full_name}
                subtitle={following.username}
                userPicturePath={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`}
              />
              
            )))}
      </Box>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {type !== "home" ? "Followers" : ""}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {type !== "home"
          ? followers.map((friend) => (
              <Friend
                isFollowed={false}
                key={friend.user_id}
                friendId={friend.user_id}
                name={friend.full_name}
                subtitle={friend.username}
                userPicturePath={`https://avatar.iran.liara.run/public/boy?username=Ash${Math.random()}`}
              />
            ))
          : null}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
