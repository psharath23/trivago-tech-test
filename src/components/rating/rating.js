import React from "react"
import "./rating.scss"
import { images } from "./../../image_imports"
const getIcon = (name, height = 25, width = 30, index, rating) => <img
    src={Object.keys(images).includes(name) ? images[name] : name}
    alt={name}
    height={height}
    style={Math.floor(rating) === index ?
        { position: "absolute", clip: `rect(0, ${+width * +rating / 5}px, ${height}px, 0)` } :
        { position: "absolute", clip: `rect(0, ${width}px, ${height}px, 0)` }}
    width={width}></img>
const Rating = (props) => {
    const { rating=0 } = props
    return (
        <div className="rating-container">
            <span>({rating})</span>
            {new Array(parseInt(rating)).fill(0).map((v, i) => {
                return <div key={i} className="rating">
                    {getIcon("star", 25, 30, i + 1, rating)}
                </div>
            })}
        </div>
    )
}
export default Rating