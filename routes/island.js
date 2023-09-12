const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Island = require('../models/Island.js')
const { body, validationResult, check } = require('express-validator');

// Route 2 Adding the Devil Fruit
router.post('/addisland',[
    body('name').exists().withMessage(" name can not be empty"),
], async (req, res) => {
    try {
        const {name,location,description,climate,arc_apperance,image} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const island = new Island({
            name,location,description,climate,arc_apperance,image
        })
        const saveIsland = await island.save();
        res.json(saveIsland)
    }
    catch (error) {
        console.log(error.message, error)
        res.status(500).send("Internal Server Error")
    }
})

//get all islands
router.get('/getallisland',async (req, res) => {
    try {
        const island = await Island.find()
        res.json(island)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

// Route 3 update the existing devil fruit
router.put('/editisland/:id',async (req, res) => {
    const {name,location,description,climate,arc_apperance,image} = req.body;
  
  // Creating a new note
  const newIsland = {};
  if(name){newIsland.name = name};
  if(arc_apperance){newIsland.arc_apperance = arc_apperance};
  if(description){ newIsland.description = description};
  
  // find the leave request to be updated
  let island = await Island.findById(req.params.id);
  if(!island){return res.status(404).send("Not Found")}
  
  island = await Island.findByIdAndUpdate(req.params.id,{$set: newIsland},{new:true})
  res.json({island})
  })





// Route 4 Delete an devil fruit

router.delete('/deleteisland/:id',async (req, res) => {
    const {name,location,description,climate,arc_apperance,image} = req.body;
  
    // find the leave request to be deleted
    let island = await DevilFruit .findById(req.params.id);
    if(!island){return res.status(404).send("Not Found")}
  
    island = await Island.findByIdAndDelete(req.params.id)
    res.json({"success":"Island has been Deleted"})
    })


module.exports = router