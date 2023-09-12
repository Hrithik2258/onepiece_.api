const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const DevilFruit = require('../models/DevilFruit.js')
const { body, validationResult, check } = require('express-validator');


// // Route 1 get all  The devil Fruit
router.get('/getalldevilfruit',async (req, res) => {
    try {
        const devilfruit = await DevilFruit.find()
        res.json(devilfruit)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

  // Route 2 Adding the Devil Fruit
  router.post('/adddevilfruit', [
    body('name').exists().withMessage("Devil fruit name can not be empty"),
    body('type').exists().withMessage("type can not be empty")
], async (req, res) => {
    try {
        const {name,type,description,user,image} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const devilfruit = new DevilFruit({
            name,type,description,user,image
        })
        const saveDevilFruit = await devilfruit.save();
        res.json(saveDevilFruit)
    }
    catch (error) {
        console.log(error.message, error)
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 update the existing devil fruit
router.put('/editdevilfruit/:id',async (req, res) => {
    const {name,type,description,user} = req.body;
  
  // Creating a new note
  const newDevilFruit = {};
  if(name){newDevilFruit.name = name};
  if(type){ newDevilFruit.type = type};
  if(description){ newDevilFruit.description = description};
  if(user){ newDevilFruit.user = user};
  
  // find the leave request to be updated
  let devilfruit = await DevilFruit.findById(req.params.id);
  if(!devilfruit){return res.status(404).send("Not Found")}
  
  devilfruit = await DevilFruit.findByIdAndUpdate(req.params.id,{$set: newDevilFruit},{new:true})
  res.json({devilfruit})
  })




// Route 4 Delete an devil fruit

router.delete('/deletedevilfruit/:id',async (req, res) => {
    const {title,date} = req.body;
  
    // find the leave request to be deleted
    let devilfruit = await DevilFruit .findById(req.params.id);
    if(!devilfruit){return res.status(404).send("Not Found")}
  
    devilfruit = await DevilFruit.findByIdAndDelete(req.params.id)
    res.json({"success":"Incometax has been Deleted"})
    })


module.exports = router