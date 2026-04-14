import { SORT_VALUE } from "../constant/index.js"

export const parseSortOrder = (sortOrder) => {
    const isSortOrder = [SORT_VALUE.ASC, SORT_VALUE.DESC].includes(sortOrder)
    if(isSortOrder) return sortOrder
    return SORT_VALUE.ASC
} 
export const parseSortBy = (sortBy) => {
const keyOfCar = [
    "_id",
    "brand",
    "model",
    "year",
    "price_usd",
    "mileage_km",
    "engine",
    "transmission",
    "drivetrain",
    "body_type",
    "color",
    "features",
    "in_stock"
]
if(keyOfCar.includes(sortBy)) {
    return sortBy
}
return "_id"
}
export const parseSortParams = (query) => {
const {sortOrder, sortBy} = query

const parsedSortOrder = parseSortOrder(sortOrder)
const parsedSortBy = parseSortBy(sortBy)

return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy
}
}