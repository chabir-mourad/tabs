const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose =require('mongoose')
 const users = []


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




app.get('/', (req, res) => 



Tableau.find({} , function(err,foundItem){
if (err) {
    console.log(err)
}     
else {
    if(foundItem) {
       if (foundItem.length===0) {
           const user1 = new Tableau({
name : "John",
facebook_page:"John Doe",
instagram_page:"John@Doe" ,
montant: 45
           })
           user1.save(function(err){
               if (err) {
                   console.log(err)
               }
               else {
                   console.log("item is succesfully added")
               }
           })
           const user2 = new Tableau ({
            name : "Alice",
            facebook_page:"Alice Doe",
            instagram_page:"Alice@Doe" ,
            montant: 32
           })
           user2.save(function(err){
            if (err) {
                console.log(err)
            }
            else {
                console.log("item is succesfully added")
            }
        })
        user3 = new Tableau ({
            name : "Hello",
            facebook_page:"Hello Doe",
            instagram_page:"Hello@Doe" ,
            montant: 22
        })
user3.save(function(err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("item added succesfuly")
    }
})

       }
      else {
          res.render('tableau' , {foundItems : foundItem})
      }
    }
}
})
)


app.post('/addClient' , function(req,res) {
const newUser = new Tableau({
    name : req.body.username,
    facebook_page:req.body.facebookPage ,
    instagram_page:req.body.instagramPage ,
    montant : req.body.montantRestant
})
newUser.save(function(err) {
    if (err) {
        console.log(err)
    } 
    else {
        console.log("succesfully addded new client")
    }

})
res.redirect('/')
})


app.post('/:id' , function(req,res) {
    Tableau.findOneAndDelete({_id:req.params.id} , function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})


app.get('/edit/:id' , function(req,res) {
let editableId = req.params.id
Tableau.find({_id: editableId} , function(err,data) {
    if (err) {
        console.log(err)
    }
    else {
res.render('edit' , {data:data})
    }
})

}) 
    

app.post('/edit/:id' , function(req,res) {

    const editableId = req.params.id 


    Tableau.updateOne({_id:editableId} , 
        {   name:req.body.username,
            facebook_page:req.body.facebookPage,
            instagram_page:req.body.instagramPage,
            montant:req.body.montantApayer
        
        
        
        },function(err) {
            if(err) {
                console.log(err)
            }
            else{
              console.log("document succsesfully updated")
            }
        }
        
        
        )


res.redirect('/')

})


















app.listen(port, () => console.log(`Example app listening on port 3000!`))