import React from "react"
import "./hotel.scss"
import { images } from "./../../image_imports"
import { BASE_URL, APP_ROUTES } from "./../../constants"
import Rating from "../rating/rating"
import { currency } from "./../../utils"
import NoRecordsFound from "../no_records_found/no_records_found"
import { Link } from "react-router-dom"
import Amenities from "../amenities/amenities"
import AppContext from "../../app_context"
const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}

export default class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    onToggle = (evt) => {
        evt.preventDefault()
        this.setState({ toggle: !this.state.toggle })

    }

    getDistanceType = (distance) => {
        if (+distance < 2000) {
            return "low"
        }
        if (+distance < 4000) {
            return "medium"
        }
        return "high"
    }

    getPriceType = (price) => {
        if (+price < 2000) {
            return "low"
        }
        if (+price < 4000) {
            return "medium"
        }
        return "high"
    }

    render() {
        const { hotel } = this.props
        const { toggle } = this.state
        const { rooms = [] } = hotel;
        const {images=[]} = hotel
        const minPrice = rooms.length > 0 ? rooms.reduce((minPr, room) => {
            return room.price_in_usd < minPr ? room.price_in_usd : minPr
        }, Infinity) : 0
        const maxPrice = rooms.length > 0 ? rooms.reduce((maxPr, room) => {
            return room.price_in_usd > maxPr ? room.price_in_usd : maxPr
        }, 0) : 0
        const maxOccupancy = (hotel.rooms || []).reduce((maxOc, room) => {
            return room.max_occupancy > maxOc ? room.max_occupancy : maxOc
        }, 0)
        return (
            <AppContext.Consumer>
                {context => <div className={toggle ? "hotel hotel-expanded" : "hotel"}>
                    <Link to={APP_ROUTES.HOTEL_DETAIL + hotel.id + `?city=Leipzig&country=Germany&from_date=2020-03-05&to_date=2020-03-08`}>
                        <div className="hotel-imp-info">
                            <div className="hotel-images">
                                {images.length > 0 && getIcon(BASE_URL + hotel.images[0], "", "")}
                                {images.length === 0 && <span>No image</span>}
                            </div>
                            <div className="hotel-details">
                                <div className="hotel-name">
                                    {hotel.name}
                                </div>
                                <div className="hotel-room-price">{currency.format(minPrice)}</div>
                                <div className="hotel-distance-to-venue">
                                    <div>{getIcon("road", 30, 30)}</div>
                                    <div><span className={this.getDistanceType(hotel.distance_to_venue)}>{hotel.distance_to_venue}m</span> {context.lang.from_location}</div>
                                </div>
                                <div className="hotel-rating">
                                    <Rating rating={hotel.rating} />
                                </div>
                            </div>
                            <div className={toggle ? "hotel-details-toggle expand" : "hotel-details-toggle"} onClick={this.onToggle}>{getIcon("down_arrow", 20)}</div>
                        </div>
                        {
                            toggle &&
                            <div className="hotel-more-info">
                                <div className={"hotel-price-category"}>
                                    {context.lang.price_ranges_from} {currency.format(minPrice)} to {currency.format(maxPrice)}
                                </div>
                                <div className="hotel-room-info">
                                    <div className="hotel-room-max-occ-text">{context.lang.capacity}: </div>
                                    <div className="hotel-room-max-occ">{maxOccupancy} {context.lang.persons}</div>
                                </div>
                                <div className="hotel-amenities">
                                    <div className="hotel-amenities-text">{context.lang.amenities}: </div>
                                    {/* {hotel.amenities.length === 0 && <NoRecordsFound name={"amenities"} />}
                                {hotel.amenities.slice(0, 2).map((am) => getIcon(am))}<span>{hotel.amenities.length > 2 ? " and more..." : ""}</span> */}
                                    <Amenities amenities={hotel.amenities} showLabels={false} />
                                </div>
                            </div>
                        }
                    </Link>
                </div >}
            </AppContext.Consumer>
        )
    }
}