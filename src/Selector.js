import React, { useState } from 'react'
import ElrondLogo from './Elrond.js'
import SubstrateLogo from "./substrateLogo.js";
import styled from "styled-components";
import ChevronDown from './ShevronDown.js';

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

const DropDown = styled('div')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-radius: 6px;
padding-inline-start: 20px;
width: 14.5vw;
height: 2.5vw;
color: white;
`

const DropdownContent = styled('div')`
display: none;
position: absolute;
background-color: #f1f1f1;
min-width: 160px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
`

const DropDownElement = styled('a')`
color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
padding-inline-start: 20px;
width: 14.5vw;
height: 2.5vw;
color: white;
text-align: left;
  &:hover {background-color: #ddd;}
`

const Selector = ({ value, data, onClick, onChange }) => {

    const [display, setDisplay] = useState('none');

    if ("ALICE" in data || "XP-ALICE" in data){
        data = Object.keys(data)
    }

    if (!value){
        value = data[0]
    }

    const handleClick = () => {

        if (display === 'none') {
            setDisplay('block');
        } else {
            setDisplay('none');
        }

    }

    const handleDropDownClick = (datum) => {
        if (display === 'block') {
            setDisplay('none');
        }

        onChange(datum)
    }

    return (

        <DropDown
            onClick={() => handleClick()}
        >
            
            <Wrapper>
                {
                    value && (value === 'Elrond' || value === 'EGLD' || value.slice(0,3) === 'XP-')
                        ? <ElrondLogo />
                        : <SubstrateLogo />
                }
                <StyledText>
                    {value}
                </StyledText>
                <ChevronDown />
            </Wrapper>
            
            <DropdownContent
                style={{ display }}
                
            >
                {
                    data.map(item => {
                        return (
                            <DropDownElement>
                            <Wrapper>
                                {
                                    item && (item === 'Elrond' || item === 'EGLD'  || item.slice(0,3) === 'XP-')
                                        ? <ElrondLogo />
                                        : <SubstrateLogo />
                                }
                                <StyledText
                                onClick={() => handleDropDownClick(item)}
                                >
                                    {item}
                                </StyledText>
                            </Wrapper>
                        </DropDownElement>
                    )})
                }

            </DropdownContent>
            
        </DropDown>
    )
}


export default Selector;