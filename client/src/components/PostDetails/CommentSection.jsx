import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts.actions";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles(),
    [comments, setComments] = useState([]),
    [comment, setComment] = useState(""),
    dispatch = useDispatch();

  const handleClick = () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    if (user) {
      dispatch(commentPost(finalComment, post?._id));
    } else {
      alert("pls login to comment");
    }
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField fullWidth minRows={4} variant="outlined" multiline value={comment} label="Comment" onChange={(e) => setComment(e.target.value)} />
            <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
