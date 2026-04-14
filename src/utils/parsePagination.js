const parseString = (numbers, defaultValue) => {
    const isString = typeof numbers === 'string'
    if(!isString) return defaultValue
    const parsedNumbers = parseInt(numbers)
    if(Number.isNaN(parsedNumbers)) {
        return defaultValue
    }
    return parsedNumbers
}

export const parseFilterParams = (query) => {
    const {page, perPage} = query

    const parsedPage = parseString(page)
    const parsedPerPage = parseString(perPage)

    return {
        page: parsedPage,
        perPage: parsedPerPage
    }
}

export const calculatePaginationParams = (count, page, perPage) => {
    const totalPages = count / perPage

    return {
        page,
        perPage,
        totalItems: count,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalPages
    }
}
