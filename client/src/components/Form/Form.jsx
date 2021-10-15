import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Filebase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.actions";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: "", message: "", selectedFile: "", tags: "" });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  //Handle Input
  const handleInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  // clear PostData
  const clear = () => {
    setCurrentId(null);
    setPostData({ ...postData, title: "", message: "", selectedFile: "", tags: "" });
  };
  //Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleInput} required />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={handleInput} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} required />
        <div className={classes.fileInput}>
          <Filebase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" type="button" fullWidth onClick={clear}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
