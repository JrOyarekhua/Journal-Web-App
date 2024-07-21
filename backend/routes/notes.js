const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    // send back all the notes (allow for pagination in params)
})

router.route('/:id')
.get((req,res) => {
    // get a specific note by id 
})
.post((req,res) => {
    // create a new user in the db
})
.put((req,res) => {
    // update a specific user in the db
})
.delete((req,res) => {
    // delete a user in the db
})

module.exports = router