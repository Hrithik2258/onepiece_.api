
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();


app.use(express.json())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
//Setting the All the Routes That we are Currently working

app.use('/api/auth', require('./routes/auth'))  //http://localhost:5000/api/auth
app.use('/api/character', require('./routes/character'))  //http://localhost:5000/api/auth
app.use('/api/arc',require('./routes/arc'))    //http://localhost:5000/api/arc                      
app.use('/api/devilfruit',require('./routes/devilfruit'))    //http://localhost:5000/api/arc     
app.use('/api/island',require('./routes/island'))    //http://localhost:5000/api/island     
app.use('/api/sword',require('./routes/sword'))    //http://localhost:5000/api/sword    
app.use('/api/luffyattack',require('./routes/luffyattack'))    //http://localhost:5000/api/sword    
app.use('/api/dial',require('./routes/dial'))    //http://localhost:5000/api/sword    
app.use('/api/haki',require('./routes/haki'))    //http://localhost:5000/api/sword    
app.use('/api/favorite',require('./routes/favorite'))    //http://localhost:5000/api/sword    





// using the middleware for getting the response in the terminal
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} conncetd succesfully`));
  })
  .catch((error) => console.log(`${error} did not connect`));




