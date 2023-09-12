const express = require('express');
const router = express.Router();
const LuffyAttack = require('../models/LuffyAttack')
const { body, validationResult, check } = require('express-validator');

// Route 2 Adding the Devil Fruit
router.post('/addluffyattack',[
    body('attackname').exists().withMessage(" swordname can not be empty"),
], async (req, res) => {
    try {
        const {attackname,attackpower,description,image} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const luffyattack = new LuffyAttack({
            attackname,attackpower,description,image
        })
        const saveLuffyAttack = await luffyattack.save();
        res.json(saveLuffyAttack)
    }
    catch (error) {
        console.log(error.message, error)
        res.status(500).send("Internal Server Error")
    }
})

//get all islands
router.get('/getallluffyattack',async (req, res) => {
    try {
        const luffyattack = await LuffyAttack.find()
        res.json(luffyattack)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

// Route 3 update the existing devil fruit
router.put('/editluffyattack/:id',async (req, res) => {
    const {attackname,attackpower,description,image} = req.body;
  
  // Creating a new note
  const newLuffyAttack = {};
  if(attackname){newLuffyAttack.attackname = attackname};
  if(attackpower){newLuffyAttack.attackpower = attackpower};
  if(description){ newLuffyAttack.description = description};
  if(image){ newLuffyAttack.image = image};
  
  // find the leave request to be updated
  let luffyattack = await LuffyAttack.findById(req.params.id);
  if(!luffyattack){return res.status(404).send("Not Found")}
  
  luffyattack = await LuffyAttack.findByIdAndUpdate(req.params.id,{$set: newLuffyAttack},{new:true})
  res.json({luffyattack})
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