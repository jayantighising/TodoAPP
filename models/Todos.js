const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const TodosSchema = new Schema({
 
  title: 
  {
    type:String,
    required:true,
    // enum:['a','b','c']
  },
  description: String
}, {timestamps:true});

module.exports= mongoose.model('Todos',TodosSchema); // module lai chhai export garna parxa.