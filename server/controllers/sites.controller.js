const path = require('path')

module.exports = {
    default: (req, res, next) => {
        res.sendFile('build/index.html', {
            root: path.join(__dirname, '../../')
        })
    },
}
