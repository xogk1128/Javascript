const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(()=>{
        console.log("CONNECTION OPEN!!");
    })
    .catch((err)=>{
        console.log("OH NO ERROR!!!!");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 10
    },
    price : {
        type : Number,
        min : 0
    },
    onSale : {
        type : Boolean,
        default : false
    },
    catacories : {
        type :[String],
        default : ['cycling']
    },
    qty : {
        online:{
            type:Number,
            default : 0
        },
        inStore:{
            type:Number,
            default : 0
        },
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({name:'Bike Helmet', price :29.50, categories : ['Cycling', 'Safety']});
bike.save()
    .then((data)=>{
        console.log("IT WORKED!");
        console.log(data);
    })
    .catch(err=>{
        console.log("OH NO! ERROR!!");
        console.log(err);
    })
