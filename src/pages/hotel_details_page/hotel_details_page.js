import React from "react"
import "./hotel_details_page.scss"
import { images } from "./../../image_imports"
import { BASE_URL, API_URLS, API_TYPES } from "./../../constants"
import service from "./../../service/service"
import ImageSlider from "../../components/image_slider/image_slider"
import { getValuesFromQuery } from "./../../utils"
import Rating from "../../components/rating/rating"
import Amenities from "../../components/amenities/amenities"
import Room from "../../components/room/room"
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

export default class HotelDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: {
                "id": "", // uuid v4
                "name": "", // string
                "description": "", // string
                "distance_to_venue": 0, // integer (in meters)
                "rating": 0, // float (0 - 5)
                "price_category": "", // string ['low', 'medium', 'high']
                // array of strings ['free_parking','free_wifi','pets','restaurant','gym','pool','spa']
                "amenities": [],
                // array of strings (first url is considered to be the "main" image showing the hotel)
                "images": [],
                "rooms": []
            },
            city: "",
            country: "",
            roomsLoaded: false
        }
    }


    componentDidMount() {
        const id = this.props.match.params["id"]
        const searchData = getValuesFromQuery(this.props.location.search)
        const city = searchData["city"]
        const country = searchData["country"]
        service(API_TYPES.GET, API_URLS.HOTEL(id))
            .then((resp) => {
                this.setState((prevState) => {
                    return {
                        hotel: resp.body,
                        city, country
                    }
                })
            })
    }

    loadMore = (evt) => {
        evt.preventDefault()
        this.setState({ roomsLoaded: true })
    }

    render() {
        const { hotel, city, country, roomsLoaded } = this.state
        let { rooms } = hotel
        rooms = roomsLoaded ? rooms : rooms.slice(0, 2)
        return (
            <AppContext.Consumer>
                {context => <div className="hotel-details">
                    <div className="hotel-name">{hotel.name}</div>
                    <div className="hotel-images-slides">
                        <ImageSlider images={hotel.images} description={hotel.description} />
                    </div>
                    <div className="details">
                        <div className="detail">
                            <span className="details-heading">{context.lang.distance}: </span>
                            <span className="details-content">{hotel.distance_to_venue}m {city && ` from ${city}`}{country && `, ${country}`}</span>
                        </div>
                        <div className="detail">
                            <span className="details-heading">{context.lang.rating}: </span>
                            <span className="details-content"><Rating rating={hotel.rating} /></span>
                        </div>
                        <div className="detail">
                            <span className="details-heading">{context.lang.amenities}: </span>
                            <span className="details-content"><Amenities amenities={hotel.amenities} /></span>
                        </div>
                    </div>
                    <div className="rooms-div">
                        <div className={roomsLoaded ? "details-content rooms rooms-loaded-more" : "details-content rooms"}>
                            {
                                rooms.map((room) => <Room room={room} hotelId={hotel.id} city={city} country={country} />)
                            }
                        </div>
                    </div>
                    {!roomsLoaded && <div className="load-more-div">
                        <div className="load-more" onClick={this.loadMore}>{context.lang.load_more_rooms}</div>
                    </div>}
                </div>}
            </AppContext.Consumer>
        )
    }
}