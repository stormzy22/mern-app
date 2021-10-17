import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts.actions";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles(),
    [comments, setComments] = useState(post?.comments),
    [comment, setComment] = useState(""),
    dispatch = useDispatch(),
    commentRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    if (user) {
      const newComment = await dispatch(commentPost(finalComment, post?._id));
      setComments(newComment);
      setComment("");
      commentRef?.current?.scrollIntoView({ behavior: "smooth" });
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
              <strong> {c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
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
