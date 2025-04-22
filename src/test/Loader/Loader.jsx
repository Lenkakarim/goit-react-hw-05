import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({
  size = 50,
  color = "#ff7f50",
  center = true,
}) => {
  const style = {
    display: center ? "flex" : "inline-block",
    justifyContent: center ? "center" : "initial",
    alignItems: center ? "center" : "initial",
    marginTop: "2rem",
  };

  return (
    <div style={style}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
