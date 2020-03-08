import React from "react"
import "./choose_location.scss"
import AppContext from "../../app_context";
import { MESSAGE } from "../toast/toast";
const earth = require("./../../images/earth.svg")
export default class ChooseLocation extends React.Component {
    setLoc = (evt,context) => {
        evt.preventDefault()
        context.showToast(context.lang.change_loc_disabled,MESSAGE.INFO)
    }
    render() {
        const { loc } = this.props
        return (
            <AppContext.Consumer>
                {context=><div className="choose-loc" onClick={(evt)=>this.setLoc(evt,context)}>
                    <span className="change-loc-text">{context.lang.hotels_near} {loc}</span><img src={earth} alt={"earth"}/>
                </div>}
            </AppContext.Consumer>
        )
    }
}