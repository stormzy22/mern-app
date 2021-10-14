import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state?.posts);
  if (!posts?.length && !isLoading) return "No Posts";

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts?.map((post, i) => (
            <Grid item key={i} xs={12} md={12} sm={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
