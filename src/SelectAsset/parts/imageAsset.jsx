import React from "react";
import ImageText from "./assetText";
import CheckBox from "./checkbox";

export default function ImageAsset(props) {
  const { img, text } = props;
  return (
      <>
    <div style={{position: "relative"}}>
      <img src={img} alt={text} className="image-assets-style" />
      <CheckBox/>
      <ImageText text={"test"}/>
    </div>
    </>
  );
}
