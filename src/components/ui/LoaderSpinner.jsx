import React from "react";
import { HashLoader } from "react-spinners";

const LoaderSpinner = () => {
  return (
    <div className="loader-container">
      <HashLoader color="#e65d00" />
    </div>
  );
};

export default LoaderSpinner;
