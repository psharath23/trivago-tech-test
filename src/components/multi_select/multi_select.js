import React, { useState } from "react"
import "./multi_select.scss"
import { images } from "./../../image_imports"

const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}

const MultiSelect = (props) => {

    const { values, selectedValues, name } = props
    const onSelect = (value) => {
        let selValues = [...selectedValues]
        if (selValues.includes(value)) {
            selValues = selValues.filter((v) => v !== value)
        } else {
            selValues = [...selValues, value]
        }
        props.onSelect(selValues)
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="multi-select" onClick={() => setIsOpen(!isOpen)}>
            <div className="multiselect-name">{name.replace(/_/g, ' ')} <span className="selected-count">({selectedValues.length})</span></div>
            {isOpen &&

                <div className="values">
                    {
                        values.map((value, i) => {
                            return <div className="select-value-item" key={`key-${i}-${value}`} onClick={(evt) => { evt.preventDefault(); onSelect(value) }}>
                                <div className="select-value-checkbox">
                                    {getIcon(selectedValues.includes(value) ? "check" : "uncheck")}
                                </div>
                                <div className="select-value-name">{value}</div>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default MultiSelect