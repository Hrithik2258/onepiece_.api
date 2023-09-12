const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Sword = require('../models/Sword.js')
const { body, validationResult, check } = require('express-validator');

// Route 2 Adding the Devil Fruit
router.post('/addsword',[
    body('swordname').exists().withMessage(" swordname can not be empty"),
], async (req, res) => {
    try {
        const {swordname,description,image,swordpower,swordowner} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sword = new Sword({
            swordname,description,image,swordpower,swordowner
        })
        const saveSword = await sword.save();
        res.json(saveSword)
    }
    catch (error) {
        console.log(error.message, error)
        res.status(500).send("Internal Server Error")
    }
})

//get all islands
router.get('/getallsword',async (req, res) => {
    try {
        const sword = await Sword.find()
        res.json(sword)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

// Route 3 update the existing devil fruit
router.put('/editsword/:id',async (req, res) => {
    const {swordname,description,image,swordpower,swordowner} = req.body;
  
  // Creating a new note
  const newSword = {};
  if(swordname){newSword.swordname = swordname};
  if(swordowner){newSword.swordowner = swordowner};
  if(description){ newSword.description = description};
  if(image){ newSword.image = image};
  if(swordpower){ newSword.swordpower = swordpower};
  
  // find the leave request to be updated
  let sword = await Sword.findById(req.params.id);
  if(!sword){return res.status(404).send("Not Found")}
  
  sword = await Sword.findByIdAndUpdate(req.params.id,{$set: newSword},{new:true})
  res.json({sword})
  })





// Route 4 Delete an devil fruit

router.delete('/deletesword/:id',async (req, res) => {
    const {swordname,description,image,swordpower,swordowner} = req.body;
  
    // find the leave request to be deleted
    let sword = await Sword .findById(req.params.id);
    if(!sword){return res.status(404).send("Not Found")}
  
    sword = await Sword.findByIdAndDelete(req.params.id)
    res.json({"success":"Sword has been Deleted"})
    })


module.exports = router