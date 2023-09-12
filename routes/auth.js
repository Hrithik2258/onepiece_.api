
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'passwors$password';
var fetchuser = require('../middleware/fetchuser')


router.post('/createuser', [
  body('email').isEmail(),
  body('fullname').isLength({ min: 3 }),
  check('password')
    .exists()
    .withMessage("password can Not be blank"),
], async (req, res) => {
  // if theere are eror send the bed request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  // Check Wheter the user with this email exist already
  try {


    let user = await User.findOne({ email: req.body.email })
    // console.log(user);
    if (user) {
      return res.status(400).json({ error: " Sorry user with this email exist already" })
    }

    // Securing the user with bcrypt.js
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    // Creating a user
    user = await User.create({
      fullname: req.body.fullname,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id,
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    //  console.log(jwtData);
    res.json({ authToken })
    // Catching errors
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error OPccoured")
  }
})



// Making the Login Route abnd most of the Things will be same as previous so we can copy the upwards things  ROUTE:2
router.post('/login', [
  body('email').isEmail(),

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: " please Try to login with Correct credientials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({ error: " please Try to login with Correct credientials" });
    }
    const data = {
      user: {
        id: user.id,
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    //  console.log(jwtData);

    res.json({ authToken })

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }

})


// Get The login  User detail  : POST"/api/auth/getuser ROUTE:3

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})


//get the all user detail
router.get('/getalluser',async (req, res) => {
  try {
      const user = await User.find()
      res.json(user)
  }
  catch (error) {
      console.log(error.message)
      res.status(500).send("can Not get the all user")
  }
})


//get the all user detail
router.get('/getalluser',async (req, res) => {
  try {
      const user = await User.find()
      res.json(user)
  }
  catch (error) {
      console.log(error.message)
      res.status(500).send("can Not get the all user")
  }
})



//update password
// Update User Password: POST "/api/auth/updatepassword"
router.post('/updatepassword', fetchuser, [
  check('oldPassword', 'Old password cannot be blank').exists(),
  check('newPassword', 'New password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Fetch user
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Check if old password is correct
    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
});




// Update User Data: PUT "/api/auth/updateuser"
router.put('/updateuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const {
      fullname,
      email,
      password
    } = req.body;
    if (fullname) user.fullname = fullname;
    if (email) user.email = email; 
    if (password) user.password = password; 
    user = await user.save();
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router