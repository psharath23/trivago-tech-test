import React from "react"
import "./room.scss"
import { currency } from "../../utils"
import { Link } from "react-router-dom"
import { APP_ROUTES } from "../../constants"
import AppContext from "../../app_context"
export default class Room extends React.Component {
    render() {
        const { room, hotelId, city, country } = this.props
        return (
            <AppContext.Consumer>
                {context => <div className="room">
                    <div className="room-name">{room.name}</div>
                    <div className="room-description">
                        <span className="details-heading">{context.lang.description}:</span>
                        <span className="details-content">{room.description}</span>
                    </div>
                    <div className="room-occ-price">
                        <div className="room-max-occupancy">
                            <span className="details-heading">{context.lang.capacity}:</span>
                            <span className="details-content">{room.max_occupancy}</span>
                        </div>
                        <div className="book-room"><Link to={APP_ROUTES.CONFIRMATION.replace(":hotelId", hotelId).replace(":roomId", room.id) + `?city=${city}&country=${country}&from_date=2020-03-05&to_date=2020-03-08`}>{context.lang.book}</Link></div>
                        <div className="room-price">
                            <span className="details-heading">{context.lang.price}:</span>
                            <span className="details-content">{currency.format(room.price_in_usd)}</span>
                        </div>
                    </div>
                </div >}
            </AppContext.Consumer>
        )
    }
}