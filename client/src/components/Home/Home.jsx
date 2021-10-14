import React, { useEffect, useState } from "react";
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts.actions";
import Pagination from "../Pagination";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null),
    classes = useStyles(),
    dispatch = useDispatch(),
    query = useQuery(),
    history = useHistory(),
    page = query.get("page") || 1,
    searchQuery = query.get("searchQuery"),
    [search, setSearch] = useState(""),
    [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDel) => setTags(tags.filter((tag) => tag !== tagToDel));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(() => {
                    return e.target.value;
                  });
                }}
              />
              <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
              <Button onClick={searchPost} className={classes.appBarSearch} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
