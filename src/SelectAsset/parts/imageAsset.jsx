import React from "react";
import ImageText from "./assetText";
import CheckBox from "./checkbox";

export default function ImageAsset({hash, img, cb}) {
  return (
      <>
    <div style={{position: "relative"}}>
      <img src={img} alt={hash} className="image-assets-style" />
      <CheckBox cb={() => cb && cb(hash)}/>
      <ImageText text={hash}/>
    </div>
    </>
  );
}
