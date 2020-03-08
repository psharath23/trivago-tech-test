import React from "react"
import "./page_not_found.scss"
import AppContext from "../../app_context"
import { FREE_ROUTES } from "../../constants"
import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <AppContext.Consumer>
            {context => <div className="page-not-found">
                <div className="page-not-found-text">
                    {context.lang.page_not_found}
                </div>
                <div className="possible-routes">
                    {context.lang.possible_routes_you_might_wanna_visit}
                </div>
                <div className="routes">
                    {Object.keys(FREE_ROUTES).map((route) => {
                        return <div className="route">
                            <Link to={FREE_ROUTES[route]}>
                                {route}
                            </Link>
                        </div>
                    })}
                </div>
            </div>}
        </AppContext.Consumer>
    )
}

export default PageNotFound