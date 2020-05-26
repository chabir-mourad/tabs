const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose =require('mongoose')
 
app.use(express.static('public'))
app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/usersDB', {useNewUrlParser: true, useUnifiedTopology: true});

const tableauSchema = new mongoose.Schema({
name: String ,
facebook_page : String,
instagram_page : String,
montant : Number

})

const Tableau =  mongoose.model("Tableau" , tableauSchema)




app.get('/', (req, res) => res.render('tableau'))

Tableau.find({} , function(err,foundItem){
    
})



























app.listen(port, () => console.log(`Example app listening on port 3000!`))