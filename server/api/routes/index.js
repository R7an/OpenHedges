const router = require('express').Router();
const usersRoutes = require('./users.routes');

// register routes ////////////////////
router.use('/api/users', usersRoutes)


// Handle API 404
router.use('/api/*', function(req, res, next) {
    res.sendStatus(404)
})

// Handle 500
router.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
        return next()
    }

    // Log it
    console.error(err.stack)

    // Redirect to error page
    res.sendStatus(500)
})

module.exports = router