import React from "react"
import "./toast.scss"
import  AppContext from "../../app_context";
export const MESSAGE = {
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    ERRRO: "error"
}
export default class Toast extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {context => (
                    context.showToastFlag
                        ?
                        <div className={`toast ${context.toastType}`}>
                            <span className="toast-message">{context.toastMessage}</span>
                        </div>
                        :
                        null
                )}
            </AppContext.Consumer>

        )
    }
}