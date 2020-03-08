export const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export const getValuesFromQuery = (queryString) => {
    const queryStr = queryString.slice(1)
    const data = queryStr.split("&")
    const values = {}
    data.forEach((v) => {
        const data = v.split("=")
        values[data[0]] = data[1]
    })
    return values
}   