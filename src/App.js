import AppContext from "./app_context"
import './App.css';
import ErrorBoundary from "./components/error_boundry/error_boundary"
import React, { Suspense } from 'react';
import { Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from 'history';
import Header from './components/header/header';
import Sidebar from "./components/sidebar/sidebar"
import Toast from './components/toast/toast';
import { MESSAGE } from "./components/toast/toast"
import { languageOptions, dictionaryList } from "./languages/index"
import { APP_ROUTES } from "./constants";
import AdminPage from "./pages/create_hotel/create_hotel";
import CreateHotel from "./pages/create_hotel/create_hotel";
import DeleteHotel from "./pages/delete_hotel/delete_hotel";
import PageNotFound from "./pages/page_not_found.js/page_not_found";
const history = createBrowserHistory();
const LandingPage = React.lazy(() => import("./pages/landing_page/landing_page"))
const HotelDetailsPage = React.lazy(() => import("./pages/hotel_details_page/hotel_details_page"))
const ConfirmationPage = React.lazy(() => import("./pages/confirmation_page/confirmation_page"))
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      toggleSidebar:this.toggleSidebar,
      showToastFlag: false,
      toastMessage: "",
      showToast: this.showToast,
      hideToast: this.hideToast,
      toastType: MESSAGE.INFO,
      isSidebarOpen: false,
      lang: dictionaryList["en"],
      setLanguage:this.setLanguage
    }
  }

  setLanguage = (id) => {
    let l = dictionaryList[id]
    this.setState({ lang: l })
  }

  toggleSidebar = () => {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
  }

  showToast = (message, type) => {
    this.setState({ showToastFlag: true, toastMessage: message, toastType: type }, () => {
      setTimeout(() => {
        this.hideToast()
      }, 2000);
    })
  }

  hideToast = () => {
    this.setState({ showToastFlag: false, toastMessage: "" })
  }

  render() {

    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <ErrorBoundary>
            <Header isOpen={this.state.isSidebarOpen} />
            <Sidebar isSidebarOpen={this.state.isSidebarOpen}/>
            <Router history={history}>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path={APP_ROUTES.LANDING_SCREEN} component={LandingPage} />
                  <Route exact path={APP_ROUTES.HOTEL_DETAIL + ":id"} component={HotelDetailsPage} />
                  <Route exact path={APP_ROUTES.CONFIRMATION} component={ConfirmationPage} />
                  <Route exact path={APP_ROUTES.CREATE_HOTEL} component={CreateHotel} />
                  <Route exact path={APP_ROUTES.DELETE_HOTEL} component={DeleteHotel} />
                  <Route path={"*"} component={PageNotFound}></Route>
                </Switch>
              </Suspense>
            </Router>
            <Toast />
          </ErrorBoundary>
        </div>
      </AppContext.Provider >
    );
  }
}

export default App;
