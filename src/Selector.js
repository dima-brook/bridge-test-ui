import ElrondLogo from './Elrond.js'
import SubstrateLogo from "./substrateLogo.js";
import styled from "styled-components";
import ChevronDown from './ShevronDown.js';

const StyledSelector = styled('div')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-radius: 6px;
padding-inline-start: 20px;
width: 14.5vw;
height: 2.5vw;
color: rgba(255, 255, 255, 0.8);
`

const Wrapper = styled('div')`
height: 100%;
padding: 0;
margin: 0;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
flex-grow: 4;
`;

const StyledText = styled('span')`
display: flex;
align-items: center;
font-family: Work Sans; 
margin-left: 1vw; 
order:2; 
flex-grow: 4;
`


const Selector = ({ value, tokens, chains }) => {
    return (
        <StyledSelector>
            <Wrapper>
                {value && (value === tokens[0] || value === chains[0])
                ? <SubstrateLogo />
                : <ElrondLogo />
                }
                <StyledText>{value}</StyledText>
                <ChevronDown />
            </Wrapper>

        </StyledSelector>
    )
}

export default Selector;