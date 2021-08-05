import React from "react";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";


// {hash, url}[]
export default function SelectAssets({ imgs, cb, unselectCb }) {
  return (
    <>
      <div className="scroll-wrapper">
        <div className="select-asset-container" id="select-asset-container-scroll">
          {imgs.map(({ hash, url }) => {
            return <ImageAsset hash={hash} img={url} cb={cb} unselectCb={unselectCb} />
          })}
        </div>
      </div>
    </>
  );
}
