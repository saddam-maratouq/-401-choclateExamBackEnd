


const express = require('express') 
const cors = require('cors')  
require('dotenv').config();

const axios =require('axios'); 

const PORT = process.env.PORT

const server =express(); 

const  mongoose = require("mongoose");

server.use(cors());
server.use(express.json());


////////////////////////////////// 




server.listen(PORT,() => {
    
    console.log('im lisstening 3001')
})


       

// https://ltuc-asac-api.herokuapp.com/allChocolateData  


  server.get('/getchoclate',ApiHandler)  


 async function ApiHandler (req,res) {

    console.log('inside api');

    let Url =`https://ltuc-asac-api.herokuapp.com/allChocolateData`

    let  choclate = await  axios.get(Url) 

    console.log(choclate.data);  

    let  chocoArray = choclate.data.map( item => {

            return new Choclates (item)  
    } )
  
    console.log(chocoArray); 
res.send(chocoArray)  

  }

  
   



  class Choclates {

    constructor (data) { 

        this.title= data.title
        this.imageUrl= data.imageUrl

    }
  }




//////////////////////////////////////////////////////////  

mongoose.connect('mongodb://localhost:27017/Choco',{ useNewUrlParser: true, useUnifiedTopology: true });

  /// schema   

  let chocoSchema = new mongoose.Schema ({

    email :String , 

    title : String , 

    imageUrl : String
  })  



 const choclateModel = mongoose.model(choco,chocoSchema)



  server.post('/Addchoclate', AddHanler) 
  
  function AddHanler (req,res) {

        let {email,title,imageUrl } =req.body  

        choclateModel.create({email,title ,imageUrl})  

        choclateModel.find({ } , function (err,addData) {

            res.send(addData)
        } )


  }

  ///////////////////////////////// 


  server.delete('/DeletChoco:id',Delet) 

  function Delet (req,res) {

        let id = req.params.id 

        choclateModel.deleteOne({ _id : id  } ,function (err,delet) {

            choclateModel.find({ } , function (err,NewData)  {

                    res.send(NewData) 
            })
        }  )
  }


  ///////////////////////////////////////////////  


  server.put('UbdateChoco/:id', Ubdate)   

  function Ubdate (req,res) {


    let id = req.params.id  

            let {title,imageUrl} = req.body 

            choclateModel.find({ _id : id   } ,(err,updat) => {

                updat[0].title=title 

                updat[0].imageUrl=imageUrl  


                updat[0].save   

            
        
                choclateModel.find({} ,(err,result)  => {

                        res.send(result) 
                })
        } ) 


  }

