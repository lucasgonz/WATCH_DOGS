const express = require('express')

// import quads.json from ressources folder and store it in a variable
const quads = require('../ressources/quads.json')

// use router object to define routes
const router = express.Router()

// define routes for drones that send back drones data
router.get('/', (req, res) => {
   res.send(quads.quads)
})

// define route that update all drones data stored in quads variable
router.post('/', (req, res) => {
   quads.quads = req.body
   console.log(quads.quads)
   res.send(quads.quads)
})

// export router object
module.exports = router
