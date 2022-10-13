var express = require('express');
var router = express.Router();

var  todos= require("../resource/todo"); //doing imports form folder outside of routes.
// console.log(todos);

const Todos=require('../models/Todos');

/* GET home page. */
router.get('/',  async function(req, res, next) {

  const todos= await Todos.find();
  // console.log(todos);
  res.render('home', { todosList:todos}); // passing the value of todos variable in home page.
});

// router.get('/home', function(req, res, next) {
//   res.render('home')
// })

router.get('/add-to-do',function(req,res,next){//view file render matrai garxa.
  res.render('addToDo',{title:"Add To Do"});// {} it sebd the value of title "Add To Do " in addToDo
});

// router.post('/save-to-do',function(req,res,next){
//   todos.push({...req.body,_id:`00${todos.length}`});
//   res.redirect('/');
// })

router.post('/save-to-do',async function(req,res,next){
  await Todos.insertMany
  ({ 
    title:req.body.title, 
    description:req.body.description
  })
  todos.push({...req.body,_id:`00${todos.length}`});
  res.redirect('/');
})

// router.get('/delete-to-do/:index',function(req,res,next){ //this means dynamic index. :<> it can be changed.
  
//   todos.splice(req.params.index,1);
//   res.redirect('/');
// }) 

router.get('/delete-to-do/:id', async function(req,res,next){ //this means dynamic index. :<> it can be changed.
  
  // todos.splice(req.params.index,1);
  await Todos.deleteOne(
    {_id:req.params.id},{$set:{title:req.body.title, description:req.body.description}}
  );
  res.redirect('/');
}) ;

// router.get('/delete-to-do/:id',function(req,res,next){
//   // console.log(req.params.id);
//   const index = todos.findIndex(todo => todo._id === req.params.id);
  
//   todos.splice(index,1);
//   res.redirect('/');
// })

router.post('/edit-to-do/:id',async  function(req,res,next){
  // console.log(req.body, req.params);
  // const index =  await Todos.findOne(todo => todo._id === req.params.id);
  // todos.splice(index,1, {...req.body, _id:req.params.id});
  await Todos.updateOne(
    {_id:req.params.id},{$set:{title:req.body.title, description:req.body.description}}
  );
  res.redirect('/');
})



router.get('/open-update-form/:id',async function(req,res,next){
   //it just opens the edit page.
   const todo = await Todos.findOne({_id: req.params.id});
  //  const todotodo = todos.find(todo=> todo._id === req.params.id);
  res.render('editToDo',{todo:todo});
})

module.exports = router;
