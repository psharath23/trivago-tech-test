import React from "react"
import "./confirmation_page.scss"
import service from "./../../service/service"
import { images } from "./../../image_imports"
import { BASE_URL, API_URLS, API_TYPES } from "./../../constants"
import { getValuesFromQuery, currency } from "./../../utils"
import AppContext from "../../app_context";
import DatePicker from "../../components/datepicker/datepicker"
import ChooseLocation from "../../components/choose_location/choose_location"
import Rating from "../../components/rating/rating"

export default class ConfirmationPage extends React.Component {
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
            room: {
                "id": "",
                "name": "",	//	string
                "description": "",
                "max_occupancy": 4,
                "price_in_usd": 0.00
            },
            city: "",
            country: "",
        }
    }

    componentDidMount() {
        const stored = localStorage.getItem("stored", true)
        if (stored) {
            const hotel = JSON.parse(localStorage.getItem("hotel"))
            const city = localStorage.getItem("city")
            const country = localStorage.getItem("country")
            const room = JSON.parse(localStorage.getItem("room"))
            const fromDate = localStorage.getItem("fromDate")
            const toDate = localStorage.getItem("toDate")
            this.setState({
                hotel,
                city, country, room, fromDate, toDate
            })
            return
        }
        const hotelId = this.props.match.params["hotelId"]
        const roomId = this.props.match.params["roomId"]
        const searchData = getValuesFromQuery(this.props.location.search)
        const city = searchData["city"]
        const country = searchData["country"]
        const fromDate = searchData["from_date"]
        const toDate = searchData["to_date"]
        service(API_TYPES.GET, API_URLS.HOTEL(hotelId))
            .then((resp) => {
                const room = resp.body.rooms.find((room) => room.id === roomId)


                localStorage.setItem("stored", true)
                localStorage.setItem("hotel", JSON.stringify(resp.body))
                localStorage.setItem("city", city)
                localStorage.setItem("country", country)
                localStorage.setItem("room", JSON.stringify(room))
                localStorage.setItem("fromDate", fromDate)
                localStorage.setItem("toDate", toDate)
                this.setState((prevState) => {
                    return {
                        hotel: resp.body,
                        city, country, room, fromDate, toDate
                    }
                })
            })
    }

    render() {
        const { hotel, room, country, city, fromDate, toDate } = this.state
        return (
            <AppContext.Consumer>
                {context => <div className="confirmation-page">
                    <div className="booking-status">
                        {context.lang.booking_confirmed}
                    </div>

                    <div className="c-main-header">{context.lang.payment_details}</div>

                    <div className="payment-details">
                        <div>
                            <div className="c-row">
                                <div className="c-header"> {context.lang.mode}:</div>
                                <div className="c-value">{context.lang.paid_with_credit_card}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.actual_amount}:</div>
                                <div className="c-value">{(currency.format(room.price_in_usd))}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.internet_charges}:</div>
                                <div className="c-value"> {(currency.format(+room.price_in_usd * 0.5))}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.tax}:</div>
                                <div className="c-value">{currency.format(+room.price_in_usd * 0.10)}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.total}:</div>
                                <div className="c-value">{currency.format(room.price_in_usd + +room.price_in_usd * 0.5 + +room.price_in_usd * 0.5)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-details">
                        <div>
                            <div className="c-main-header">{context.lang.booking_details}</div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.from_date}:</div>
                                <div className="c-value">{fromDate}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.to_date}:</div>
                                <div className="c-value">{toDate}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.location}:</div>
                                <div className="c-value">{city && ` from ${city}`}{country && `, ${country}`}</div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details">
                        <div>
                            <div className="c-main-header">{context.lang.hotel_details}</div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.hotel_name}:</div>
                                <div className="c-value">{hotel.name}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.rating}</div>
                                <div className="c-value"><div className="rating"><Rating rating={hotel.rating} /></div></div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.room_name}:</div>
                                <div className="c-value">{room.name}</div>
                            </div>
                            <div className="c-row">
                                <div className="c-header">{context.lang.capacity}:</div>
                                <div className="c-value">{room.max_occupancy}</div>
                            </div>
                        </div>
                    </div>
                </div>}
            </AppContext.Consumer>
        )
    }
}