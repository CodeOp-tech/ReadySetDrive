import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import "./Error404View.css";

function Error404View() {
  return (
    <div className="Erro404View">
      {/* <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Candal&display=swap"
          rel="stylesheet"
        />
      </div> */}

      <div className="wrapper">
        <img
          src="https://wallpaperaccess.com/full/3275697.jpg"
          alt=""
          onmousedown="return false;"
        />
        <h5>
          Why Bro,
          <br />
          Why did you do that....
        </h5>
        <h3>You just Hit END</h3>
        <h1> 4 4 </h1>
        <a href="/">
          <BsArrowLeftCircle className="arrow-icon" />
          Let's Go Back
        </a>
      </div>
    </div>
  );
}

export default Error404View;
