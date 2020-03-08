import React from "react"
import service from "./../../service/service"
import NoRecordsFound from "./../../components/no_records_found/no_records_found"
import Hotel from "../../components/hotel/hotel";
import ChooseLocation from "./../../components/choose_location/choose_location"
import "./landing_page.scss"
import { API_URLS, API_TYPES } from "../../constants";
import HotelFilter from "./../../components/hotel_filter/hotel_filter"
import AppContext from "../../app_context";
import DatePicker from "../../components/datepicker/datepicker";
export default class LandingPage extends React.Component {
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
            }
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

            const max_occupancies = (hotel.rooms||[]).map((room) => room.max_occupancy)
            filters.max_occupancy = [...new Set([...filters.max_occupancy, ...max_occupancies || 0])]
            filters.rating = [...new Set([...filters.rating, hotel.rating || 0])]
        })
        return filters
    }

    componentDidMount() {
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
        const { loc, hotels, selectedFilters, filterValues, filterNames } = this.state
        const filteredHotels = this.getFilteredListOfHotels(hotels, selectedFilters)
        return (
            <AppContext.Consumer>
                {context => <div className="landing-page">
                    <div className="landing-loc">
                        <ChooseLocation onChange={this.setLocation} loc={loc} />
                    </div>
                    <div className="landing-date">
                        <DatePicker date="2020-03-03" />
                        <DatePicker date="2020-03-05" />
                    </div>
                    <div className="landing-page-hotel-filters">
                        <HotelFilter onChange={this.onFilterChange} filterNames={filterNames} filterValues={filterValues} selectedFilters={selectedFilters} />
                    </div>
                    <div className="clear-filters-div">
                        <div className="clear-filters" onClick={this.clearFilters}>{context.lang.clear_all}</div>
                    </div>
                    <div className="hotels-list">
                        {
                            filteredHotels.length > 0 &&
                            filteredHotels.map((hotel) => {
                                return <Hotel key={hotel.id} hotel={hotel} location={loc} />
                            })
                        }
                        {filteredHotels.length === 0 && <NoRecordsFound name="hotels" />}
                    </div>
                </div>}
            </AppContext.Consumer>
        )
    }
}