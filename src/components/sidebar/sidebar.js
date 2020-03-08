import React from "react"
import "./sidebar.scss"
import { languageOptions } from "../../languages"
import AppContext from "../../app_context"
import { FREE_ROUTES } from "../../constants"
import { Link, Router } from "react-router-dom"
import { createBrowserHistory } from "history"
const history = createBrowserHistory();
const Sidebar = (props) => {
    return (
        <AppContext.Consumer>
            {context => <div className="" onClick={context.toggleSidebar}>
                <div className={props.isSidebarOpen ? "sidebar open" : "sidebar"}>
                    <div className="lang-header">languages</div>
                    <div className="lang-list">
                        {
                            languageOptions.map((lang) => {
                                return <div className="lang-item" key={lang.id} onClick={() => context.setLanguage(lang.id)}>{lang.text}</div>
                            })
                        }
                    </div>
                    <div className="lang-header">{context.lang.navigation}</div>
                    <div className="lang-list">
                        <Router history={history}>
                            {Object.keys(FREE_ROUTES).map((route) => {
                                return <div className="lang-item">
                                    <Link to={FREE_ROUTES[route]}>
                                        {route}
                                    </Link>
                                </div>
                            })}
                        </Router>
                    </div>
                </div>
            </div>}
        </AppContext.Consumer>
    )
}

export default Sidebar