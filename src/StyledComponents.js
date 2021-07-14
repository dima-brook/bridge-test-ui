import styled from "styled-components";

export const XPApp = styled('div')`
text-align: center;
`

export const XPMain = styled('main')`
align-self: center;
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
border-radius: 20px;
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
color: #ffffff;
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
color: #ffffff;
`

export const XPDiv = styled('div')``

export const XPInput = styled('input')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-radius: 6px;
color: #ffffff;
width: 11.5vw;
height: 2.5vw;
caret-color: white;
padding-inline-start: 20px;
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
color: #ffffff;
opacity: 0.6;
`

export const XPTransaction = styled('input')`
height: 2.5vw;
width: 100%;
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-radius: 6px;
color: white;
padding-left: 10px;
&:focus{
  outline: none;
font-family: Inter;
font-weight: 500;
font-size: 0.8em;
color: #FFFFFF;
}
`