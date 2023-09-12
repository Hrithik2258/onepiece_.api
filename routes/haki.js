const express = require('express');
const router = express.Router();
const Haki = require('../models/Haki.js')
const { body, validationResult, check } = require('express-validator');


// // Route 1 get all  the Arcs 
router.get('/getallhaki',async (req, res) => {
    try {
        const haki = await Haki.find()
        res.json(haki)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

  // Route 2 Adding the Arc following
  router.post('/addhaki', [
    body('hakiname').exists().withMessage("haki name can Not be blank"),
], async (req, res) => {
    try {
        const { hakiname,description,hakiuser} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const haki = new Haki({
            hakiname,description,hakiuser
        })
        const saveHaki = await haki.save();
        res.json(saveHaki)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 update the existing Arc
router.put('/haki/:id',async (req, res) => {
    const {  hakiname,description,hakiuser} = req.body;
  
  // Creating a new note
  const newHaki = {};
  if(hakiname){newHaki.hakiname = hakiname};
  
  // find the leave request to be updated
  let haki = await Haki.findById(req.params.id);
  if(!haki){return res.status(404).send("Not Found")}
  
  haki = await Haki.findByIdAndUpdate(req.params.id,{$set: newHaki},{new:true})
  res.json({haki})
  })




// Route 4 Delete an arc

router.delete('/deletehaki/:id',async (req, res) => {
    const { hakiname,description,hakiuser} = req.body;
  
    // find the leave request to be deleted
    let haki = await Haki .findById(req.params.id);
    if(!haki){return res.status(404).send("Not Found")}
  
    haki = await Haki.findByIdAndDelete(req.params.id)
    res.json({"success":"Incometax has been Deleted"})
    })


module.exports = router