var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');

var app =express();

app.use(parser.urlencoded({extended:false}));
const booksSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        author:String,
        price:Number,
        publisher:String,
        distributor:String
    }
);
const booksmodel = mongoose.model('books',booksSchema);
mongoose.connect("mongodb+srv://7ananthan:godisgrea7@cluster0-fcx3v.mongodb.net/test?retryWrites=true&w=majority");

app.get('/',(req,res)=>{
    res.send("hai..");
});
app.post('/new',async(req,res)=>{
    try {
        var booksdata= new booksmodel(req.body);
        var result= await booksdata.save();
        res.json(result);        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
});