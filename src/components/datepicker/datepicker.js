import React from "react"
import AppContext from "../../app_context"
import "./datepicker.scss"
import {images} from "./../../image_imports"
import { MESSAGE } from "../toast/toast"
const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}

const DatePicker = (props) => {
    const setDate = (evt,context) => {
        evt.preventDefault()
        context.showToast(context.lang.change_date_disabled,MESSAGE.INFO)
    }
    return (
        <AppContext.Consumer>
            {context=><div className="datepicker" onClick={(evt)=>setDate(evt,context)}>
                <div className="datepicker-icon">
                    {getIcon("calendar")}
                </div>
                <div className="datepicker-date">{props.date}</div>
            </div>}
        </AppContext.Consumer>
    )
}

export default DatePicker