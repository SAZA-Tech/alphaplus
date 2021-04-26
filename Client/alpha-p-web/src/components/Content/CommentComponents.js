import PropTypes from "prop-types";
import {  Typography } from "@material-ui/core";
// import { ProtectedRoute } from "../AuthRoute";

const CommentComponentBody = (props) => {
  return (
    <div style={{ padding: "16px" }}>
      <span>
        <Typography variant="body1">{props.body}</Typography>
      </span>
      <span>
        <Typography variant="caption">{props.date}</Typography>
      </span>
    </div>
  );
};

CommentComponentBody.propTypes = {
  name: PropTypes.string,
  avatr: PropTypes.string,
  date: PropTypes.string,
  body: PropTypes,
};

export default CommentComponentBody;
