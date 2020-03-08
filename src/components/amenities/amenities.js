import React from "react"
import "./amenities.scss"
import { images } from "./../../image_imports"
const getIcon = (name, height = 25, width = 30) => <img
    src={Object.keys(images).includes(name) ? images[name] : name}
    alt={name}
    height={height}
    // style={Math.floor(amenities) === index ?
    //     { position: "absolute", clip: `rect(0, ${+width * +amenities / 5}px, ${height}px, 0)` } :
    //     { position: "absolute", clip: `rect(0, ${width}px, ${height}px, 0)` }}
    width={width}></img>
const Amenities = (props) => {
    const { amenities, showLabels=false } = props
    return (
        <div className="amenities-container">
            {amenities.map((amnty, i) => {
                return <div key={i} className="amenities">
                    {getIcon(amnty, 25, 30)}
                    {showLabels && <span>({amnty})</span>}
                </div>
            })}
        </div>
    )
}
export default Amenities