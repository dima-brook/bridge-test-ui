import React, { Fragment } from "react";
import arrowsSvgSwitch from "./assets/SVG/arrowsSvgSwitch.svg"
/**
 * Swaps the Source <=> Target blockchains
 * @param {Event} onClick
 * @returns round button JSX
 */
const SwapChains = ({ onClick }) => {

  return (
    <Fragment>
      <button className="buttonExchange" onClick={onClick}>
        <img src={arrowsSvgSwitch} alt="ArrowSVG" class="arrows-svg-switch"/>
      </button>
    </Fragment>
  );
};

export default SwapChains;
