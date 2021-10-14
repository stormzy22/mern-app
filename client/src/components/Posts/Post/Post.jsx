import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.actions";
import useStyles from "./styles";

dayjs.extend(relativeTime);

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const diapatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes?.media} image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload/v1/${post.selectedFile}`} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="body2">{dayjs(post.createdAt).fromNow()}</Typography>
      </div>
      {user?.result?._id === post?.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post?._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post?.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" className={classes?.title} gutterBottom>
        {post?.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post?.message.length >= 200 ? `${post?.message.slice(0, 200)} ...` : post?.message}
        </Typography>
      </CardContent>
      <CardActions className={classes?.cardActions}>
        <Button size="small" disabled={!user?.result} color="primary" onClick={() => diapatch(likePost(post._id))}>
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button size="small" color="primary" onClick={() => diapatch(deletePost(post?._id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
