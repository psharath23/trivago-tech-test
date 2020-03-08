import { BASE_URL, API_TYPES } from "../constants"

export default (apitype, url, body = null) => {
    const api_url = BASE_URL + url
    return new Promise((resolve, reject) => {
        let options = { method: apitype }
        if (apitype === API_TYPES.POST) {
            options = {
                method: apitype, body: JSON.stringify(body), headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        }
        return fetch(api_url,options)
            .then((response) => response.json())
            .then((resp) => resolve(resp))
            .catch((err) => reject(err))
    })

}