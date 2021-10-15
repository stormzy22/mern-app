import { CircularProgress, Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import useStyles from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getPost } from "../../actions/posts.actions";
import { Image } from "cloudinary-react";

dayjs.extend(relativeTime);

const PostDetail = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const history = useHistory(),
    dispatch = useDispatch(),
    classes = useStyles(),
    { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post?.tags?.map((tag, i) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: "none", color: "#3f51b5" }} key={i}>
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post?.name}`} style={{ textDecoration: "none", color: "#3f51b5" }}>
              {` ${post?.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{dayjs(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <Image className={classes.media} cloudName={process.env.REACT_APP_CLOUDINARY_NAME} publicId={post?.selectedFile} alt={post?.title} draggable={false} />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetail;
