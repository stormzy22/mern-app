import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";
import useStyles from "./styles";

const Pagination = () => {
  return (
    <div>
      <h1>Pagination</h1>
    </div>
  );
};

export default Pagination;
