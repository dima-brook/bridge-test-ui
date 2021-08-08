import React from "react";
import ImageText from "./assetText";
import CheckBox from "./checkbox";

export default function ImageAsset({ hash, img, cb, unselectCb, onClick, selected, index }) {

  const onclick = () => {

    cb && cb(hash);
    onClick()
    selected = index === selected ? true : false
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src={img}
          alt={hash}
          className="image-assets-style"
          onClick={onclick}
        />
        <CheckBox
          cb={() => cb && cb(hash)}
          onClick={onClick}
          selected={index === selected ? true : false}
        />
        <ImageText text={hash} />
      </div>
    </>
  );
}
