const express = require('express')
const app = express()
const port = 3021

// import drone route from routes folder
const drones = require('./routes/Drones')

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

// use drone route object to define routes
app.use('/drones', drones)

// defaut route for 404 error
app.use((req, res, next) => {
   res.status(404).send("Sorry, that route doesn't exist")
})

module.exports = app
