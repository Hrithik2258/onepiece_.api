const express = require('express');
const multer = require('multer');
const router = express.Router();
const Character = require('../models/character.js')
const { body, validationResult, check } = require('express-validator');


    // Storage and file name settings
let storage = multer.diskStorage({
    destination:'../uploads',
    filename: (req,file,cb)=>{
        // cb(null,Date.now(+file+originalname))
        cb(null,file.orignalname)
    }
})
let upload = multer({
    storage: storage
 })

// Route 1: Get all the Devil Fruits with pagination
router.get('/getcharacter', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the request query
      const pageSize = 50; // Set the number of items per page
  
      const skip = (page - 1) * pageSize;
  
      const characters = await Character.find()
        .skip(skip)
        .limit(pageSize)
        .exec();
  
      const totalCharacters = await Character.countDocuments();
  
      const totalPages = Math.ceil(totalCharacters / pageSize);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;
  
      res.json({
        data: characters,
        totalPages,
        nextPage,
        prevPage,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Could not retrieve characters");
    }
  });
  

  // Route 2 Adding the  Character
  router.post('/addcharacter',upload.single('image'), [
    body('fullname').exists().withMessage("name can not be empty"),
    body('bounty').exists().withMessage("bounty can not be empty")
], async (req, res) => {
    try {
        const {fullname,bounty,role,devilfruit,crew,image} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const character = new Character({
            fullname,bounty,role,devilfruit,crew,image
        })
        const saveCharacter = await character.save();
        res.json(saveCharacter)
    }
    catch (error) {
        console.log(error.message, error)
        console.log(error)
        res.status(500).send("Internal Server Error",ErrorEvent)
    }
})


// Route 3 update the existing devil Character

router.put('/editcharacter/:id',async (req, res) => {
    const {fullname,bounty,role,devilfruit,crew,image} = req.body;
  
  // Creating a new note
  const newCharacter = {};

  if(devilfruit){ newCharacter.devilfruit = devilfruit};
  if(bounty){ newCharacter.bounty = bounty};
  if(image){ newCharacter.image = image};
  
  // find the leave request to be updated
  let character = await Character.findById(req.params.id);
  if(!character){return res.status(404).send("Not Found")}
  
  character = await Character.findByIdAndUpdate(req.params.id,{$set: newCharacter},{new:true})
  res.json({character})
  })




// Route 4 Delete an devil fruit

router.delete('/deletecharacter/:id',async (req, res) => {
    const {fullname,bounty,role,devilfruit,crew} = req.body;
  
    // find the leave request to be deleted
    let character = await Character .findById(req.params.id);
    if(!character){return res.status(404).send("Not Found")}
  
    character = await Character.findByIdAndDelete(req.params.id)
    res.json({"success":"Incometax has been Deleted"})
    })


module.exports = router