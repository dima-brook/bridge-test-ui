import React, { useState } from "react";
import ImageAsset from "./parts/imageAsset";
import "./SelectAsset.css";


// {hash, url}[]
export default function SelectAssets({ imgs, cb }) {

  const [selected, setSelected] = useState(-1);

  const handleItemClick = (i) => {

    if (i !== selected){
      setSelected(i)
    }

    

  }

  return (
    <>
      <div className="scroll-wrapper">
        <div className="select-asset-container" id="select-asset-container-scroll">
          {imgs.map(({ hash, url }, i) => {
            return <ImageAsset
              key={i}
              index={i}
              hash={hash}
              img={url}
              cb={cb}
              onClick={() => handleItemClick(i)}
              selected={selected}
            />
          })}
        </div>
      </div>
    </>
  );
}
