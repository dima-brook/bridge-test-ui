import styled from "styled-components";

const bgField = '#051937';
const lightBlue = '#045adb';
const borderColor = '#374462';
const eltHeight = '2.5vw';
const textColor = '#FFFFFF';
const paddingStart = '20px';
const borderRadius = '20px';

export const XPButton = styled('button')`
margin-top: 1vw;
height: 3vw;
background: ${lightBlue};
opacity: 0.9;
border: none;
margin-bottom: 0.5vw;
box-shadow: inset 0px 2px 2px rgba(104, 164, 255, 0.25);
border-radius: 6px;
`

export const XPButtonText = styled("div")`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 126%;
display:flex;
align-items: center;
justify-content: center;
letter-spacing: 0.03em;
color: ${textColor};
`

export const XPApp = styled('div')`
text-align: center;
`

export const XPMain = styled('main')`
align-content: center;
`

export const XPFlexCenter = styled('div')`
padding: 1vw;
display: flex;
flex-direction: column;
`

export const XPBoxCenter = styled('div')`
width: 33vw;
height: fit-content;
background: #030c21;
border: 1px solid ${borderColor};
border-radius: ${borderRadius};
padding: 1.5vw;
`

export const XPLabel = styled('div')`
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
color: ${textColor};
opacity: 0.6;
`

export const XPColumn = styled('div')`
display: flex;
flex-direction: column;
padding-bottom: 0.8vw;
`

export const XPRow = styled('div')`
display: flex;
align-items: center;
justify-content: space-between;
`

export const XPTitle = styled('div')`
width: 339px;
height: 33px;
font-family: Work Sans;
font-weight: bold;
font-size: 26px;
text-align: left;
margin-top: 1vw;
letter-spacing: 0.03em;
color: ${textColor};
`

export const XPDiv = styled('div')``

export const XPInput = styled('input')`
background: ${bgField};
border: 1px solid ${borderColor};
box-sizing: border-box;
border-radius: 6px;
color: ${textColor};
width: 11.5vw;
height: ${eltHeight};
caret-color: ${textColor};
padding-inline-start: ${paddingStart};
border-bottom-right-radius: 0px;
border-top-right-radius: 0px;
&:focus {
  outline: none;
}
`

export const XPInfo = styled('div')`
height: 1.9vw;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 126%;
display: flex;
align-items: center;
letter-spacing: 0.03em;
color: ${textColor};
opacity: 0.6;
`

export const XPTransaction = styled('input')`
height: ${eltHeight};
width: 100%;
background: ${bgField};
border: 1px solid ${borderColor};
box-sizing: border-box;
border-radius: 6px;
padding-left: 10px;
&:focus{
  outline: none;
font-family: Inter;
font-weight: 500;
font-size: 0.8em;
color: ${textColor};
}
`

export const XPWrapper = styled('div')`
height: 100%;
padding: 0;
margin: 0;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
flex-grow: 4;
`;

export const XPStyledText = styled('span')`
display: flex;
align-items: center;
font-family: Work Sans; 
margin-left: 1vw; 
order:2; 
flex-grow: 4;
`

export const XPDropDown = styled('div')`
background: ${bgField};
border: 1px solid ${borderColor};
border-radius: 6px;
box-sizing: border-box;
color: ${textColor};
padding-inline-start: ${paddingStart};
width: 14.5vw;
height: ${eltHeight};
`

/**
 * A placeholder for the option menu items
 */
export const XPDropDownContent = styled('div')`
display: none;
position: absolute;
background-color: #f1f1f1;
min-width: 160px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
margin-left:-20px;
`
/**
 * An item of the option menu
 * 
 * On hover changes background color to light blue
 */
export const XPDropDownElement = styled('a')`
padding: 12px 16px;
display: block;
background: ${bgField};
border: 1px solid ${borderColor};
box-sizing: border-box;
padding-inline-start: ${paddingStart};
width: 14.5vw;
height: ${eltHeight};
color: ${textColor};
text-decoration: none;
text-align: left;
  &:hover {background-color: ${lightBlue};}
`