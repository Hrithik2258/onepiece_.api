const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Dial = require('../models/Dial.js')
const { body, validationResult, check } = require('express-validator');


// // Route 1 get all  the Arcs 
router.get('/getalldial',async (req, res) => {
    try {
        const dial = await Dial.find()
        res.json(dial)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

  // Route 2 Adding the Arc following
  router.post('/adddial', [
    body('dialname').exists().withMessage("title can Not be blank"),
    body('dialtype').exists().withMessage("Starting of the episode can not be blank")
], async (req, res) => {
    try {
        const { dialname,dialtype,dialdescription,image} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const dial = new Dial({
            dialname,dialtype,dialdescription,image
        })
        const saveDial = await dial.save();
        res.json(saveDial)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 update the existing Arc
router.put('/editdial/:id',async (req, res) => {
    const { dialname,dialtype,dialdescription,image} = req.body;
  
  // Creating a new note
  const newDial = {};
  if(dialname){newDial.dialname = dialname};
  if(dialtype){ newDial.dialtype = dialtype};
  
  // find the leave request to be updated
  let dial = await Dial.findById(req.params.id);
  if(!dial){return res.status(404).send("Not Found")}
  
  dial = await Dial.findByIdAndUpdate(req.params.id,{$set: newDial},{new:true})
  res.json({dial})
  })




// Route 4 Delete an arc

router.delete('/deletedial/:id',async (req, res) => {
    const {dialname,dialtype,dialdescription,image} = req.body;
  
    // find the leave request to be deleted
    let dial = await Dial .findById(req.params.id);
    if(!dial){return res.status(404).send("Not Found")}
  
    diall = await Dial.findByIdAndDelete(req.params.id)
    res.json({"success":"Incometax has been Deleted"})
    })


module.exports = router