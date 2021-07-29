import React from "react";
import SelectAllButton from "./parts/selectAllbutton";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";

export default function SelectAssets(props) {
  const {} = props;
  return (
    <>
      <div className="select-all-flex">
        <div className="select-all-title-text">Select asset</div>
        <SelectAllButton />
      </div>
      <div className="select-asset-container" id="select-asset-container-scroll">
        <ImageAsset />

      </div>
    </>
  );
}
