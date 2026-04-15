export const filters = (carQuery, filter) =>  {
    if(filter.brand) {
        carQuery.where('brand').equals(filter.brand)
    }
    if(filter.model) {
        carQuery.where('model').equals(filter.model)
    }
    if(filter.minYear) {
        carQuery.where('year').gte(filter.minYear)
    }
    if(filter.maxYear) {
        carQuery.where('year').lte(filter.maxYear)
    }
    if(filter.minPrice_usd) {
        carQuery.where('price_usd').gte(filter.minPrice_usd)
    }
    if(filter.maxPrice_usd) {
        carQuery.where('price_usd').lte(filter.maxPrice_usd)
    }
    if(filter.minMileage_km) {
        carQuery.where('mileage_km').gte(filter.minMileage_km)
    }
    if(filter.maxMileage_km) {
        carQuery.where('mileage_km').lte(filter.maxMileage_km)
    }
    if(filter.engine) {
        carQuery.where('engine.type').equals(filter.engine)
    }
    if(filter.transmission) {
        carQuery.where('transmission').equals(filter.transmission)
    }
    if(filter.drivetrain) {
        carQuery.where('drivetrain').equals(filter.drivetrain)
    }
    if(filter.body_type) {
        carQuery.where('body_type').equals(filter.body_type)
    }
    if(filter.color) {
        carQuery.where('color').equals(filter.color)
    }
}