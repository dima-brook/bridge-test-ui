import React, { useState } from "react";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";


// {hash, url}[]
export default function SelectAssets({ imgs, cb, unselectCb }) {

  const [selected, setSelected] = useState('');

  const handleItemClick = (i) => {

    console.log(i)

  }

  return (
    <>
      <div className="scroll-wrapper">
        <div className="select-asset-container" id="select-asset-container-scroll">
          {imgs.map(({ hash, url }, i) => {
            return <ImageAsset
              key={i}
              hash={hash}
              img={url}
              cb={cb}
              unselectCb={unselectCb}
              onClick={() => handleItemClick(i)}
            />
          })}
        </div>
      </div>
    </>
  );
}
