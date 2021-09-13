import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
