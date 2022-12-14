import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./RoadtripCard.css";

import { CiCircleMore } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

function RoadtripCard(props) {
  const [isActive, setIsActive] = useState(false);
  // let roadtripData = props.roadtripData;
  //  const [cardLiked, setCardLiked] = useState([]);
  // const [current, setCurrent] = useState(props.roadtripData); .
  const navigate = useNavigate();
  let linkToFeaturedView = `/roadtrip/${props.roadtripData.id}`;
  console.log("roadtripID", props.roadtripData.id)
  
  function changeView() {
    navigate(linkToFeaturedView);
  }
  // const [cardLiked, setCardLiked] = useState();

  function handleClick(id) {
    setIsActive(!isActive);
    props.makeFav(id);
  }
  // function handleHover(event) {
  //   console.log("you just clicked");
  // }

  //put on click - just the id

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <img
          className="card-img-top home-img"
          src={props.roadtripData.image_url}
          alt="roadtrip"
          onClick={changeView}
        />
        <div className="card-body">
          <div className="title-heart-container">
            <h5 className="card-title">{props.roadtripData.title} </h5>
            <i>
              {!isActive && (
                <AiOutlineHeart
                  className="heart-icon"
                  onClick={(e) => handleClick(props.roadtripData.id)}
                />
              )}
              {isActive && (
                <AiTwotoneHeart
                  className="heart-icon2"
                  onClick={(e) => handleClick(props.roadtripData.id)}
                />
              )}
              {/* <i onClick={myFunction}></i> */}
            </i>
          </div>

          <h6 className="card-text">{props.roadtripData.countries}</h6>
          <div className="circle-icon-container">
            {" "}
            <CiCircleMore className="circle-icon" onClick={changeView} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadtripCard;
