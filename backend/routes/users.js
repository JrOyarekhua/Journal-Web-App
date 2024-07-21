const express = require('express');
const router = express.Router();

router.post('/',(req,res) => {
    // create a new user 
})

router.route('/:id')
.get((req,res) => {
    // get a specific user 
})
.put((req,res) => {
    // update user info
})
.delete((req,res) => {
    // delete a specific user
})

module.exports = router
