import React, { useState, useRef } from 'react'
import ChevronDown from './assets/SVG/ShevronDown.js';
import {
    XPDropDown,
    XPWrapper,
    XPStyledText,
    XPDropDownContent,
    XPDropDownElement
} from './StyledComponents';
import {DetectOutsideClick} from "./@utils/closeDropDown";

/**
 * Custom SELECT component
 * @param {String} value the default or selected option
 * @param {Array} data an Array || Object mapping user names to hashes
 * @param {Event} onClick click event handler
 * @param {Event} onChange change event handler
 * @returns the custom SELECT
 */
const Selector = ({ value, data, onClick, onChange }) => {

    const [display, setDisplay] = useState('none');
    const [borderRadius, setBorderRadius] = useState(6)

    //ref to close dropdown
    const closeDropDownRef = useRef(null);

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
        display === "none" 
     ? setDisplay("block") 
     : setDisplay("none");

    }

    /**
     * Dropdown menu onClick event handler
     * 
     * Passes the element's value to the parent
     * @param {String} datum 
     */
    const handleXPDropDownClick = (datum) => {
        if (display === 'block') {
            setDisplay('none');
        }

        onChange(datum)
    }

    DetectOutsideClick(closeDropDownRef, () =>
    setTimeout(() => {
        if(display !== "none") {
            setBorderRadius(6)
            setDisplay('none')
        }
    }, 100)
  );

    return (

        // ========================================================================================
        //                                  SELECT DropDown Top Window                            =
        // ========================================================================================

        <XPDropDown
            onClick={() => handleClick()}
	    style={{borderBottomRightRadius: borderRadius + "px" ,borderBottomLeftRadius: borderRadius + "px"}}
        >

            <XPWrapper>
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
                            <XPDropDownElement onClick={() => handleXPDropDownClick(item)} ref={closeDropDownRef}>
                                <XPWrapper>
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
