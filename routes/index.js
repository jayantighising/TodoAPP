var express = require('express');
var router = express.Router();

var  todos= require("../resource/todo"); //doing imports form folder outside of routes.
// console.log(todos);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { todosList:todos}); // passing the value of todos variable in home page.
});

// router.get('/home', function(req, res, next) {
//   res.render('home')
// })

router.get('/add-to-do',function(req,res,next){//view file render matrai garxa.
  res.render('addToDo',{title:"Add To Do"});// {} it sebd the value of title "Add To Do " in addToDo
});

router.post('/save-to-do',function(req,res,next){
  todos.push({...req.body,_id:`00${todos.length}`});
  res.redirect('/');
})

router.get('/delete-to-do/:index',function(req,res,next){ //this means dynamic index. :<> it can be changed.
  
  todos.splice(req.params.index,1);
  res.redirect('/');
}) 

router.post('/edit-to-do/:id', function(req,res,next){
  console.log(req.body, req.params);
  const index = todos.findIndex(todo => todo._id === req.params.id);
  todos.splice(index,1, {...req.body, _id:req.params.id});
  res.redirect('/');
})

router.get('/open-update-form/:id', function(req,res,next){
   //it just opens the edit page.
   const todotodo = todos.find(todo=> todo._id === req.params.id);
  res.render('editToDo',{todo:todotodo});
})

module.exports = router;
