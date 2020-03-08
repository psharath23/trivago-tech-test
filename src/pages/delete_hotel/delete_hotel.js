import React from "react"
import service from "./../../service/service"
import NoRecordsFound from "./../../components/no_records_found/no_records_found"
import Hotel from "../../components/hotel/hotel";
import ChooseLocation from "./../../components/choose_location/choose_location"
import "./delete_hotel.scss"
import { API_URLS, API_TYPES } from "../../constants";
import HotelFilter from "./../../components/hotel_filter/hotel_filter"
import AppContext from "../../app_context";
import DatePicker from "../../components/datepicker/datepicker";
import { images } from "./../../image_imports"
import { MESSAGE } from "../../components/toast/toast";
const getIcon = (name, height = 25, width = 30) => {
    return (
        <img
            src={Object.keys(images).includes(name) ? images[name] : name}
            alt={name}
            height={height}
            width={width} />
    )
}
export default class DeleteHotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            loc: "Leipzig, Germany",
            selectedFilters: {
                distance_to_venue: [],
                price_category: [],
                amenities: [],
                max_occupancy: [],
                rating: []
            },
            filterValues: {
                distance_to_venue: [],
                price_category: [],
                amenities: [],
                max_occupancy: [],
                rating: []
            },
            filterNames: {
                distance_to_venue: "distance",
                price_category: "price",
                amenities: "amenities",
                max_occupancy: "capacity",
                rating: "rating"
            },
            hotelsToDelete: []
        }
    }

    getFilterValues = (hotels) => {
        const filters = {
            distance_to_venue: [],
            price_category: [],
            amenities: [],
            max_occupancy: [],
            rating: []
        }
        hotels.forEach((hotel) => {
            filters.distance_to_venue = [...new Set([...filters.distance_to_venue, hotel.distance_to_venue || 0])]
            filters.price_category = [...new Set([...filters.price_category, hotel.price_category || ""])]
            filters.amenities = [...new Set([...filters.amenities, ...hotel.amenities || []])]

            const max_occupancies = (hotel.rooms || []).map((room) => room.max_occupancy)
            filters.max_occupancy = [...new Set([...filters.max_occupancy, ...max_occupancies || 0])]
            filters.rating = [...new Set([...filters.rating, hotel.rating || 0])]
        })
        return filters
    }

    componentDidMount() {
        this.fetchHotels()
    }

    fetchHotels=()=>{
        service(API_TYPES.GET, API_URLS.HOTELS)
            .then((resp) => {
                const filterValues = this.getFilterValues([...resp.body])
                this.setState((prevState) => {
                    return {
                        hotels: [...resp.body],
                        filterValues
                    }
                })
            })
    }

    onFilterChange = (selectedFilters) => {
        this.setState({ selectedFilters })
    }

    setLocation = (loc) => {
        this.setState({ loc })
    }

    clearFilters = () => {
        this.setState({
            selectedFilters: {
                distance_to_venue: [],
                price_category: [],
                amenities: [],
                max_occupancy: [],
                rating: []
            },
        })
    }

    handleHotelClick = (id) => {
        if (this.state.hotelsToDelete.includes(id)) {
            this.setState({ hotelsToDelete: this.state.hotelsToDelete.filter((ht) => ht !== id) })
        } else {
            this.setState({ hotelsToDelete: [...this.state.hotelsToDelete, id] })
        }
    }

    deleteHotels = (context) => {
        const { hotelsToDelete } = this.state
        if (hotelsToDelete.length === 0) {
            context.showToast(context.lang.please_select_atleast_one_hotel, MESSAGE.ERROR)
        }
        const payload = hotelsToDelete
        service(API_TYPES.POST, API_URLS.REMOVE_HOTELS, payload)
            .then((resp) => {
                context.showToast(resp.message, MESSAGE.SUCCESS)
                this.fetchHotels()
            })
    }

    getFilteredListOfHotels = (hotels, selectedFilters) => {
        return hotels.filter((hotel) => {
            let isValid = true
            Object.keys(selectedFilters).forEach((key) => {
                let value = hotel[key]
                if (Array.isArray(value) && value.length > 0 && selectedFilters[key].length > 0) {
                    value.forEach((v) => {
                        if (v != "" && !selectedFilters[key].includes(v)) {
                            isValid = false
                        }
                    })
                } else {
                    if (selectedFilters[key].length > 0 && !selectedFilters[key].includes(value)) {
                        isValid = false
                    }
                }
            })
            return isValid
        })
    }

    render() {
        const { loc, hotels, selectedFilters, filterValues, filterNames, hotelsToDelete } = this.state
        const filteredHotels = this.getFilteredListOfHotels(hotels, selectedFilters)
        return (
            <AppContext.Consumer>
                {context => <div className="admin-page">
                    <div className="heading delete">{context.lang.delete_hotel}</div>
                    <div className="landing-page-hotel-filters">
                        <HotelFilter onChange={this.onFilterChange} filterNames={filterNames} filterValues={filterValues} selectedFilters={selectedFilters} />
                    </div>
                    <div className="clear-filters-div">
                        <div className="clear-filters" onClick={this.clearFilters}>{context.lang.clear_all}</div>
                    </div>
                    <div className="delete-hotels">
                        {
                            filteredHotels.length > 0 &&
                            filteredHotels.map((hotel) => {
                                const icon = hotelsToDelete.includes(hotel.id) ? "check" : "uncheck"
                                return (
                                    <div key={`key-${hotel.id}`}className="del-hotel" onClick={(evt) => { evt.preventDefault(); this.handleHotelClick(hotel.id) }}>
                                        <div className="checkbox-icon">{getIcon(icon)}</div>
                                        <div className="hotel-name">{hotel.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {filteredHotels.length === 0 && <NoRecordsFound name="hotels" />}
                    <div className="inp-item">
                        <div className="delete-hotel-button" onClick={(evt) => { evt.preventDefault(); this.deleteHotels(context) }}>{context.lang.delete_hotel}</div>
                    </div>
                </div>}
            </AppContext.Consumer>
        )
    }
}