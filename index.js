const express=require('express');

const app=express();
const Product=require('./models/product');
const path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log("mongo connection succesfull");
})
.catch(err=>{
    console.log('mongo connection error!!');
    console.log(err);
})


app.get('/products',async (req,res)=>{
    const products=await Product.find({}); 
    console.log(products);
    res.render('product/index',{products});
})

app.get('/products/new',async (req,res)=>{
    res.render('product/new');
})

app.post('/products',async (req,res)=>{
    // console.log(req.body);
    // res.send("Making Your Product :)")
    const newProduct=new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      res.render('product/show', { product });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
  


app.listen(3000,()=>{
    console.log("Listening on port 3000");
})