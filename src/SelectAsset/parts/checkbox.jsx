import React, { useState } from 'react';
import CheckBoxOn from "../../assets/SVG/selectAssets/check_box.svg"
export default function Checkbox({ cb, unselectCb }) {
    const [clickCheckBox, setClickCheckBox] = useState(true);

    const onclick = () => {
        setClickCheckBox(!clickCheckBox);
        (clickCheckBox && cb) && cb();
        (!clickCheckBox && unselectCb) && unselectCb();
    };
    return <div
        onClick={onclick}
        className="select-all-check-box-none"
        checked={clickCheckBox}

    >
        {clickCheckBox ? "" : <div  className="inner-radio-box"/>}
    </div>
}