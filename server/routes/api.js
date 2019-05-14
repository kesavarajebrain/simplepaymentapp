const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const dregister = require('../modals/dregister'); 
const dmoney = require('../modals/dmoney'); 

const db = 'mongodb://user02:user02@ds349175.mlab.com:49175/sangamdb';

router.get('/', function(req, res) {
  res.send('api works');
});

mongoose.connect(db, err => {
  if (err) {
    console.log('Error !' + err);
  } else {
    console.log('connected to mongoDB');
  }
});

//register
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new dregister(userData);
  user.save((error, userData) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: userData._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token, payload, user });
    }
  });
});

//login
router.post('/login',(req,res)=>{
  let userData = req.body
  dregister.findOne({mobile: userData.mobile},(error,user)=>{
      if(error){
          console.log(error)

      }else{
          if(!user){
              res.status(401).send('Invalid Phone Number')

          }
          else{
              //add jwt
               let payload={subject:user._id}
               let token =jwt.sign(payload,'secretKey')
                  //before add jwt
                 // res.status(200).send(user)

                  //after add jwt

               res.status(200).send({token,payload,user})

          }
      }
  });
});

//get all users
router.get('/getallusers', (req, res) => {
  dregister.find(function(err, result) {
    if (err) {
      console.log('no data');
    } else {
      res.send(result);
    }
  });
});

//send money
router.post('/sendamount', (req, res) => {
  let moneyData = req.body;
  let money = new dmoney(moneyData);
  money.save((error, moneyData) => {
    if (error) {
      console.log(error);
    } else {
   
      res.status(200).send(moneyData);
    }
  });
});

//get paid amount
router.get('/getsentpayments', (req, res) => {
  dmoney.find(function(err, result) {
    if (err) {
      console.log('no data');
    } else {
      res.send(result);
    }
  });
});
module.exports = router;