const express = require('express')
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;





//  mongoose con
const mongoose = require('mongoose');
const { json } = require('body-parser');
mongoose.connect('mongodb+srv://vaibhav:vabs4721@cluster0.ap0fj.mongodb.net/blogdata?retryWrites=true&w=majority', {useFindAndModify: false,useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true});


// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// define mongoose schema
const contactSchema = new mongoose.Schema({
    date:String,
    subject:String
});

const Contact = mongoose.model('Contact', contactSchema);







app.set('view engine','hbs');

app.get("/",(req,res)=>{
    res.render("index");
})



app.post("/",async(req,res)=>{
    try{
      const myData = new Contact(req.body);
      const nData = await myData.save();
      res.send("Data Saved successfully");
    }catch(e){
      res.send(e);
    }
  
  });
  






app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});
