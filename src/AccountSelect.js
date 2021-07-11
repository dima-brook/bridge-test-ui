import styled from "styled-components";
import React from "react";
import ElrondLogo from './Elrond.js'
import SubstrateLogo from "./substrateLogo.js";

const StyledSelect = styled('select')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
border-radius: 6px;
padding-inline-start: 10px;
width: 14.5vw;
height: 2.5vw;
color: rgba(255, 255, 255, 0.8);
`

const StyledOption = styled('option')`
background: #051937;
border: 1px solid #374462;
box-sizing: border-box;
padding-inline-start: 10px;
width: 14.5vw;
height: 2.5vw;
color: rgba(255, 255, 255, 0.8);
list-style: none;
`

const AccountSelect = ({ accounts }) => {

    const keys = Object.keys(accounts)

    const menu = keys.map(key => {
        return (<StyledOption
            key={key}
            value={accounts[key]}
        >
            {/* {key.slice(0, 2) === "XP"
                ? <ElrondLogo />
                : <SubstrateLogo />
            } */}
                {key}
        </StyledOption>)
    });

    return (
        <StyledSelect>
            {menu}
        </StyledSelect>
    )
}

export default AccountSelect;