import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Filebase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts.actions";
import useStyles from "./styles";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
    tags: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  //Handle Input
  const handleInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  //Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

  const clear = () => {
    setPostData({
      ...postData,
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
      tags: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleInput}
          required
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleInput}
          required
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleInput}
          required
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleInput}
          required
        />
        <div className={classes.fileInput}>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="button"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
