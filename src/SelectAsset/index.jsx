import React from "react";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";


// {hash, url}[]
export default function SelectAssets({imgs, cb}) {
  return (
    <>
      <div className="select-all-flex">
        <div className="select-all-title-text">Select asset</div>
      </div>
      <div className="scroll-wrapper">
      <div className="select-asset-container" id="select-asset-container-scroll">
        {imgs.map(({hash, url}) => {
          return <ImageAsset hash={hash} img={url} cb={cb} />
        })}
      </div>
      </div>
    </>
  );
}
