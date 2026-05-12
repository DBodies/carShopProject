export const routeNotFound = (req, res) => {
    res.status(400).json({
        message: 'Route not found'
    })
}