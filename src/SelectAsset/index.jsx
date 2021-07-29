import React from "react";
import SelectAllButton from "./parts/selectAllbutton";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";


// {hash, url}[]
export default function SelectAssets({imgs}) {
  console.log(imgs);
  return (
    <>
      <div className="select-all-flex">
        <div className="select-all-title-text">Select asset</div>
        <SelectAllButton />
      </div>
      <div className="select-asset-container" id="select-asset-container-scroll">
        {imgs.map(({hash, url}) => {
          console.log(url);
          return <ImageAsset hash={hash} img={url} />
        })}
      </div>
    </>
  );
}
