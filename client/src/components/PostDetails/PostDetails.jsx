import { CircularProgress, Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import useStyles from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getPost, getPostsBySearch } from "../../actions/posts.actions";
import { Image } from "cloudinary-react";
import CommentSection from "./CommentSection";

dayjs.extend(relativeTime);

const PostDetail = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const history = useHistory(),
    dispatch = useDispatch(),
    classes = useStyles(),
    { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

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
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <Image className={classes.media} cloudName={process.env.REACT_APP_CLOUDINARY_NAME} publicId={post?.selectedFile} alt={post?.title} draggable={false} width="300px" />
        </div>
      </div>

      {recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(({ title, message, selectedFile, likes, name, _id }) => (
              <div key={_id} style={{ margin: "20px", cursor: "pointer" }} onClick={() => openPost(_id)}>
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message.slice(0, 20)}..
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Likes: {likes?.length}
                </Typography>
                <Image width="200px" cloudName={process.env.REACT_APP_CLOUDINARY_NAME} publicId={selectedFile} alt={post?.title} draggable={false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetail;
