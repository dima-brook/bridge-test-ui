import React from "react";

const Checkbox = ({ cb, onClick, selected}) => {

        const onclick = ()  => {

            if (!selected) {
                cb();
                onClick()
            }
        }

    return <div
        onClick={onclick}
        className="select-all-check-box-none"
        checked={selected}

    >
        {selected ? <div className="inner-radio-box" /> : ''}
    </div>
}

export default Checkbox;