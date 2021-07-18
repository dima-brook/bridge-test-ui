import styled from "styled-components";
const bgField = "#051937";
const lightBlue = "#045adb";
const borderColor = "#374462";
const eltHeight = "2.5vw";
const textColor = "#FFFFFF";
const paddingStart = "20px";
const borderRadius = "20px";
const XPDropDownBorder = "6px";

export const XPButton = styled("button")`
  margin-top: 1vw;
  height: 56px;
  height: 56px;

  background: ${lightBlue};
  opacity: 0.9;
  border: none;
  margin-bottom: 0.5vw;
  box-shadow: inset 0px 2px 2px rgba(104, 164, 255, 0.25);
  border-radius: 6px;


`;

export const XPButtonText = styled("div")`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.03em;
  color: ${textColor};


`;

export const XPApp = styled("div")`
  text-align: center;
`;

export const XPMain = styled("main")`
  align-content: center;
  text-align: center;
`;

export const XPFlexCenter = styled("div")`
  padding: 1vw;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const XPBoxCenter = styled("div")`

  width: 34vw;
  height: fit-content;
  background: #030c21;
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  padding: 1%;

  @media (max-width: 1024px) {
    width: 550px;
  }

`;

export const XPLabel = styled("div")`
  width: 100px;
  height: 30px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 126%;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  opacity: 0.6;
  color: ${textColor};

  @media (max-width: 1024px) {


  }

`;

export const XPColumn = styled("div")`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8vw;
`;

export const XPRow = styled("div")`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

export const XPTitle = styled("div")`
font-size: 26px;
line-height: 126%;
font-family: Work Sans;
font-style: normal;
font-weight: bold;
display: flex;
align-items: center;
letter-spacing: 0.03em;

margin 15px 0;
  color: ${textColor};


  @media (max-width: 1024px) {
    
  }
`;

export const XPDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const XPInput = styled("input")`
  background: ${bgField};
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  font-family: Inter;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  letter-spacing: 0.03em;
  color: ${textColor};
  width: 12.5vw;
  height: ${eltHeight};
  caret-color: ${textColor};
  padding-inline-start: ${paddingStart};
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;

  &:focus {
    outline: none;
  }


  @media (max-width: 1024px) {
    width: 200px;
    height: 40px;
  }
`;

export const XPInfo = styled("div")`
  height: 1.9vw;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 1vw;
  line-height: 126%;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: ${textColor};
  opacity: 0.6;


  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

export const XPTransaction = styled("input")`
  height: ${eltHeight};
  width: 100%;
  background: ${bgField};
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  border-radius: 6px;
  padding-left: 10px;
  &:focus {
    outline: none;
    font-family: Inter;
    font-weight: 500;
    font-size: 0.8em;
    color: ${textColor};
  }

  @media (max-width: 1024px) {
    height: 45px;
  }
`;

export const XPWrapper = styled("div")`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-grow: 4;
`;

export const XPStyledText = styled("span")`
  display: flex;
  font-family: Inter;
  margin-left: 1vw;
  order: 2;
  flex-grow: 4;
  cursor: pointer

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  align-items: center;
  letter-spacing: 0.03em;
  color: #ffffff;
  
  @media (max-width: 1024px) {

  }

`;

export const XPDropDown = styled("div")`
  background: ${bgField};
  border: 1px solid ${borderColor};
  border-radius: ${XPDropDownBorder};
  box-sizing: border-box;
  color: ${textColor};
  padding-inline-start: ${paddingStart};
  width: 15.5vw;
  height: ${eltHeight};

  @media (max-width: 1024px) {
    width: 250px;
    height: 40px;

  }
`;

/**
 * A placeholder for the option menu items
 */
export const XPDropDownContent = styled("div")`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 15.5vw;
  margin-left: -20px;

  @media (max-width: 1024px) {
  }
`;
/**
 * An item of the option menu
 *
 * On hover changes background color to light blue
 */
export const XPDropDownElement = styled("a")`
  padding: 1vw 1.2vw;
  display: block;
  background: ${bgField};
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  padding-inline-start: ${paddingStart};
  width: 15.5vw;
  height: ${eltHeight};
  color: ${textColor};
  text-decoration: none;
  text-align: left;

  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;

  &:hover {
    background-color: ${lightBlue};
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 40px;


  }

`;
