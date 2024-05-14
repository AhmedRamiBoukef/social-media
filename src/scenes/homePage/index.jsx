import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userid = useSelector((state) => state.id);
console.log(useSelector((state) => state));
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
          <UserWidget userId={userid} type="home" picturePath={"https://avatar.iran.liara.run/public/boy?username=Ash"} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/*<MyPostWidget picturePath={picturePath} />*/}
          {/*<PostsWidget userId={_id} />*/}
          <MyPostWidget picturePath={"picturePath"} />
          <PostsWidget userId={1} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={1} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
