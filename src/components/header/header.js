import React from "react"
import "./header.scss"
import { images } from "./../../image_imports"
import AppContext from "./../../app_context";
const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}

export default class Header extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {context=>(
                    <div className='header'>
                        <div className="menu" onClick={context.toggleSidebar}>{getIcon("menu")}</div>
                        <div className='title'>
                            <span>tri</span>
                            <span>va</span>
                            <span>go</span>
                        </div>
                        <div className="user"><div>{context.lang.hello}</div> John Doe!</div>
                    </div>)
                }
            </AppContext.Consumer>
        )
    }
}