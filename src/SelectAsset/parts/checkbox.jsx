import React from 'react';

export default function Checkbox({ cb, onClick, selected }) {

    const onclick = () => {

        if(!selected){
            cb();
            onClick()
        }

    };

    return <div
        onClick={onclick}
        className="select-all-check-box-none"
        checked={selected}

    >
        {selected ? <div  className="inner-radio-box"/> : ''}
    </div>
}