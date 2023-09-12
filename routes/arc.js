const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Arc = require('../models/Arc.js')
const { body, validationResult, check } = require('express-validator');


// // Route 1 get all  the Arcs 
router.get('/getallarc',async (req, res) => {
    try {
        const arc = await Arc.find()
        res.json(arc)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("can Not get the all user")
    }

  })

  // Route 2 Adding the Arc following
  router.post('/addarc', [
    body('arc_title').exists().withMessage("title can Not be blank"),
    body('start_episode').exists().withMessage("Starting of the episode can not be blank")
], async (req, res) => {
    try {
        const { arc_title,start_episode,end_episode,description,total_episode } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const arc = new Arc({
            arc_title,start_episode,end_episode,description,total_episode
        })
        const saveArc = await arc.save();
        res.json(saveArc)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 update the existing Arc
router.put('/editarc/:id',async (req, res) => {
    const {title,date} = req.body;
  
  // Creating a new note
  const newArc = {};
  if(title){newArc.title = title};
  if(date){ newArc.date = date};
  
  // find the leave request to be updated
  let arc = await Arc.findById(req.params.id);
  if(!arc){return res.status(404).send("Not Found")}
  
  arc = await Arc.findByIdAndUpdate(req.params.id,{$set: newArc},{new:true})
  res.json({arc})
  })




// Route 4 Delete an arc

router.delete('/deletearc/:id',async (req, res) => {
    const {arc_title,start_episode,end_episode,description,total_episode} = req.body;
  
    // find the leave request to be deleted
    let arc = await Arc .findById(req.params.id);
    if(!arc){return res.status(404).send("Not Found")}
  
    arc = await Arc.findByIdAndDelete(req.params.id)
    res.json({"success":"Incometax has been Deleted"})
    })


module.exports = router