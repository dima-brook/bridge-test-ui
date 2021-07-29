import React,{useState} from 'react';
import CheckBoxOn from "../../assets/SVG/selectAssets/check_box.svg"
export default function Checkbox(props){
    const [clickCheckBox, setClickCheckBox] = useState(true);

    const onclick = () => setClickCheckBox(!clickCheckBox)
    return <div onClick={onclick} className="select-all-check-box-none">
        {clickCheckBox ? "" : <img src={CheckBoxOn} alt="checkOn"/>}
    </div>
}