import styled from "styled-components";
import heco from "./heco.png";

const StyledSVG = styled('svg')`
    display: flex;
    align-items: center;
    order: 1
    width: 24px;
    height: 24px;
`

const ElrondLogo = () => {
    return (
        <>
        <img src={heco} alt="HT" width="25px"/>
        </>
        
    )
}

export default ElrondLogo;
