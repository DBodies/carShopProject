import createHttpError from "http-errors"


const parseEngine = (engine) => {
    if(engine === undefined) return
    if(typeof engine !== 'string') {
        throw createHttpError(422, 'Engine must be a string')
    }
    const allowed = ["petrol", "diesel", "electric", "hybrid"]
    const normalized = engine.trim().toLowerCase()
    if(!allowed.includes(normalized)) {
        throw createHttpError(422, "Invalid engine type")
    }
    return normalized
}

const parseString = (string) => {
    if(string === undefined) return
    if(typeof string !== 'string') {
        throw createHttpError(422, "Value must be a string")
    }
    return string.trim().toLowerCase()
}

const parseNumber = (number) => {
    if(number === undefined) return
    if(typeof number !== 'string') return
    const parsed = Number(number)
    if(Number.isNaN(parsed)) return
    return parsed
}

export const parsedFiltersParams = (query) => {
    const result = {}

    const stringFilters = ["brand", "model", "transmission", "drivetrain", "body_type","color"]
    stringFilters.forEach(field => {
        const value = parseString(query[field])
        if(value !== undefined) result[field] = value
    })

    const numberFields = [
        'minYear', 
        'maxYear',
        'minPrice_usd', 'maxPrice_usd',
        'minMileage_km', 'maxMileage_km']
    numberFields.forEach(field => {
        const value = parseNumber(query[field])
        if(value !== undefined) result[field] = value
        })

    const engine = parseEngine(query.engine)
        if(engine !== undefined) result.engine = engine
        
    return result
}