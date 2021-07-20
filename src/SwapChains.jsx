import React, { Fragment } from "react";
import {ReactComponent as SvgComponentArrowSwitch} from "./assets/SVG/arrowsSvgSwitch.svg";
/**
 * Swaps the Source <=> Target blockchains
 * @param {Event} onClick
 * @returns round button JSX
 */
const SwapChains = ({ onClick }) => {

  return (
    <Fragment>
      <button className="buttonExchange" onClick={onClick}>
        <SvgComponentArrowSwitch className="arrows-svg-switch"/>
        {/* <img src={arrowsSvgSwitch} alt="ArrowSVG" class="arrows-svg-switch"/> */}
      </button>
    </Fragment>
  );
};

export default SwapChains;
