import React from "react";
import "./LoadingCSS.css"

const Loading = (props) => {
  return (
    <div className="Loader">
      <div className="Loading spinner-border text-danger" role="status">
        <span className="visually-hidden"></span>
      </div>
      <h1 id="Loading">Loading...</h1>
    </div>
  );
};

export default Loading;