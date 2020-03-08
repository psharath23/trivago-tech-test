import React from "react"
import "./create_hotel.scss"
import { AMENITIES } from "../../constants"
import { images } from "../../image_imports"
import AppContext from "../../app_context"
import { MESSAGE } from "../../components/toast/toast"
import { API_URLS, API_TYPES } from "../../constants";
import service from "../../service/service"
const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}
export default class CreateHotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amenities: []
        }
        this.hotelNameRef = React.createRef()
        this.hotelDescriptionRef = React.createRef()
    }

    handleAminityClick = (amnty) => {
        if (this.state.amenities.includes(amnty)) {
            this.setState({ amenities: this.state.amenities.filter((am) => am !== amnty) })
        } else {
            this.setState({ amenities: [...this.state.amenities, amnty] })
        }
    }

    createHotel = (context) => {
        const hotelName = this.hotelNameRef.current.value
        const hotelDescription = this.hotelDescriptionRef.current.value
        if (hotelName.length === 0) {
            return context.showToast(context.lang.hotel_name_is_required, MESSAGE.ERRRO)
        }
        const payload = {
            name: hotelName,
            description: hotelDescription,
            amenities: this.state.amenities
        }
        service(API_TYPES.POST, API_URLS.CREATE_HOTEL, payload)
            .then((resp) => {
                context.showToast(resp.message, MESSAGE.SUCCESS)
            })
    }



    render() {
        const { amenities } = this.state
        return (
            <AppContext.Consumer>
                {context => <div className="admin-page">
                    <div className="create-hotel">
                        <div className="heading create">{context.lang.create_hotel}</div>
                        <div className="inp-item"><input ref={this.hotelNameRef} type="text" placeholder={context.lang.hotel_name}></input></div>
                        <div className="inp-item"><textarea ref={this.hotelDescriptionRef} placeholder={context.lang.description}></textarea></div>
                        <div className="inp-item amnty">
                            <div className="">Amenities</div>
                            <div className="amenities-list">
                                {
                                    AMENITIES.map((amenity) => {
                                        const icon = amenities.includes(amenity) ? "check" : "uncheck"
                                        return (
                                            <div className="amenity" onClick={(evt) => { evt.preventDefault(); this.handleAminityClick(amenity) }}>
                                                <div className="checkbox-icon">{getIcon(icon)}</div>
                                                <div className="amenity-name">{amenity.replace("_", " ")}</div>
                                                <div className="amenity-icon">{getIcon(amenity)}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="create-hotel-button" onClick={(evt) => { evt.preventDefault(); this.createHotel(context) }}>{context.lang.create_hotel}</div>
                        </div>
                    </div>
                </div>}
            </AppContext.Consumer>
        )
    }
}