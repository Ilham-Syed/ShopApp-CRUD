const Product=require('./models/product');
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log("mongo connection succesfull");
})
.catch(err=>{
    console.log('mongo connection error!!');
    console.log(err);
})

let seedProducts=[
    {
        name:'Apple',
        price:20,
        category:'fruit'
    },
    {
        name:'cheese',
        price:120.50,
        category:'dairy'
    },
    {
        name:'onion',
        price:20,
        category:'vegetable'
    },
    {
        name:'milk',
        price:40.57,
        category:'dairy'
    },
    {
        name:'potato',
        price:12,
        category:'vegetable'
    }
];

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res);
}).catch(e=>{
    console.log(e);
})