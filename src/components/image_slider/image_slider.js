import React, { useState } from "react"
import "./image_slider.scss"
import { BASE_URL } from "../../constants"
import { images } from "./../../image_imports"
import AppContext from "../../app_context"

const getImage = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}

const ImageSlider = (props) => {
    const { images = [], description } = props
    const [index, setIndex] = useState(0);
    const [showOverlays, toggleOverlays] = useState(true)
    const left = () => {
        if (index === 0) {
            return false
        }
        return setIndex(index - 1)
    }
    const right = () => {
        if (index === images.length - 1) {
            return false
        }
        return setIndex(index + 1)
    }
    return (
        <AppContext.Consumer>
            {context => <div className="image-slider">
                {showOverlays && <div className="arrow-left" onClick={(evt) => { evt.preventDefault(); left() }}>
                    {getImage("left_arrow", "", "")}
                </div>}
                <div className="images" onClick={(evt) => { evt.preventDefault(); toggleOverlays(!showOverlays) }}>
                    {getImage(BASE_URL + images[index], "", "")}
                    {showOverlays &&
                        <div className="description">
                            <div className="details-heading">{context.lang.about_the_hotel}: </div>
                            <div className="details-content">{description}</div>
                        </div>
                    }
                </div>
                {showOverlays && <div className="arrow-right" onClick={(evt) => { evt.preventDefault(); right() }}>
                    {getImage("left_arrow", "", "")}
                </div>}
            </div>}
        </AppContext.Consumer>
    )
}

export default ImageSlider