export const BASE_URL = "http://localhost:3000/"
export const API_URLS = {
    HOTELS: "hotels",
    HOTEL:(id)=> `hotel/${id}`,
    REMOVE_HOTELS:`hotels/remove`,
    CREATE_HOTEL: "hotel/create",
    ROOMS:(id)=>`hotel/${id}/rooms`
}
export const API_TYPES = {
    GET:"GET",
    POST:"POST",
    DELETE:"DELETE",
    PUT:"PUT"
}

export const APP_ROUTES={
    LANDING_SCREEN:"/",
    HOTEL_DETAIL:"/hotel/",
    CONFIRMATION:"/hotel/:hotelId/confirm/:roomId",
    CREATE_HOTEL:"/admin/create",
    DELETE_HOTEL:"/admin/delete"
}

export const FREE_ROUTES = {
    LANDING_SCREEN:"/",
    CREATE_HOTEL:"/admin/create",
    DELETE_HOTEL:"/admin/delete"
}
export const AMENITIES = ['free_parking','free_wifi','pets','restaurant','gym','pool','spa']