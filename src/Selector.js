import React, { useState, useRef, useEffect } from 'react'
import ChevronDown from './assets/SVG/ShevronDown.js';
import {
    XPDropDown,
    XPWrapper,
    XPStyledText,
    XPDropDownContent,
    XPDropDownElement
} from './StyledComponents';
import ElrondSVG from './assets/SVG/Elrond';
import Polka from './assets/SVG/substrateLogo';
import { chains } from './consts';

/**
 * Custom SELECT component
 * @param {String} value the default or selected option
 * @param {Array} data an Array || Object mapping user names to hashes
 * @param {Event} onClick click event handler
 * @param {Event} onChange change event handler
 * @returns the custom SELECT
 */
const Selector = ({ value, data, onClick, onChange, img, open, informOpen }) => {

    const [display, setDisplay] = useState('none');
    const [borderRadius, setBorderRadius] = useState(6)

        useEffect(() => {

            if (!open){ 
                setDisplay("none");
            }

        }, [open])


    if (!Array.isArray(data)) {
        data = Object.keys(data)
    }

    // If no value is available
    // Default to the first element in data
    if (!value) {
        value = data[0]
    }

    const borderRadiusHandler = () => display === "none" ? setBorderRadius(0) : setBorderRadius(6);

    /**
     * SELECT element onClick event handler
     * 
     * Swaps the dropdown menu visibility
     */
    const handleClick = () => {
        borderRadiusHandler();
        if(display === "none"){
            setDisplay("block");
            informOpen(true);
        }else{
            setDisplay("none");
            informOpen(false);

        }
        
    }

    /**
     * Dropdown menu onClick event handler
     * 
     * Passes the element's value to the parent
     * @param {String} datum 
     */
    const handleXPDropDownClick = (datum) => {


        onChange(datum)

        if (display === 'block') {
            setDisplay('none');
            informOpen(false);
        }
    }

    return (

        // ========================================================================================
        //                                  SELECT DropDown Top Window                            =
        // ========================================================================================

        <XPDropDown
            onClick={() => handleClick()}
            style={{ borderBottomRightRadius: borderRadius + "px", borderBottomLeftRadius: borderRadius + "px" }}
        >

            <XPWrapper>
                {img}
                {/* ================================= 2. TEXT FIELD ================================*/}
                <XPStyledText>{value}</XPStyledText>

                {/* ================================ 3. Chevron Down ===============================*/}
                <ChevronDown />

            </XPWrapper>

            {/* ======================================================================================== */}
            {/*                               SELECT DropDown Menu                                       */}
            {/* ======================================================================================== */}

            <XPDropDownContent
                style={{ display }}
                id="dropdown"
            >
                {   // Loop over the data elements:
                    data.map(item => {
                        return (
                            <XPDropDownElement onClick={() => handleXPDropDownClick(item)} key={item}>
                                <XPWrapper>
                                    {item === chains[0]
                                        ? <Polka />
                                        : item === chains[1] ? <ElrondSVG /> : img
                                    }
                                    {/* ================================= 2. TEXT FIELD ================================*/}
                                    <XPStyledText>{item}</XPStyledText>
                                </XPWrapper>
                            </XPDropDownElement>
                        )
                    })
                }

            </XPDropDownContent>

        </XPDropDown>
    )
}


export default Selector;
