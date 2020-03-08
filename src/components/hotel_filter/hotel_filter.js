import React from "react"
import "./hotel_filter.scss"
import MultiSelect from "./../multi_select/multi_select"
import AppContext from "../../app_context"

const HotelFilter = (props) => {
    const { filterValues, selectedFilters, filterNames, onChange } = props
    const onSelect = (values, key) => {
        onChange({ ...{}, ...selectedFilters, ...{ [key]: values } })
    }
    return (
        <AppContext.Consumer>
            {context => <div className="hotel-filters">
                {
                    Object.keys(filterValues).map((key) => {
                        return (

                            <div className="hotel-filter" key={`key-${key}`}>
                                <MultiSelect name={context.lang[filterNames[key]]} values={filterValues[key]} selectedValues={selectedFilters[key]} onSelect={(values) => onSelect(values, key)} />
                            </div>

                        )
                    })
                }
            </div>}
        </AppContext.Consumer>
    )
}

export default HotelFilter