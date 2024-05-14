import { Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import SavedPostsWidget from "scenes/widgets/SavedPostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [postsType,setPostsType]=useState(true);
const handleBtnChange= ()=>{
  setPostsType(!postsType)
}
  const getUser = async () => {
    const response = await fetch(`http://localhost:8000/user/profile/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget type={"profile"} userId={userId} picturePath={"https://avatar.iran.liara.run/public/boy?username=Ash"} />
          <Box m="2rem 0" />
          {<FriendListWidget id={userId} type={"profile"} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        > 
          
          {/*<MyPostWidget picturePath={user.picturePath} />*/}
          <Box
  flexBasis={isNonMobileScreens ? "42%" : undefined}
  mt={isNonMobileScreens ? undefined : "2rem"}
  display="flex"
  justifyContent="center"
  alignItems="center" // Align items vertically
  gap="1rem"
>
  <Button color={postsType ? "primary" : "inherit"} onClick={handleBtnChange}>My posts</Button>
  <Box
    height="100%"
    width="5%"
   // borderLeft="1px solid black" 
    margin="0 0.5rem" 
  />
  <Button color={!postsType ? "primary" : "inherit"} onClick={handleBtnChange}>Saved posts</Button>
</Box>

          <Box m="2rem 0" />
          {/*
            postsType ? (<PostsWidget userId={userId} isProfile />)
            : (<SavedPostsWidget/>)
  */}
          
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
