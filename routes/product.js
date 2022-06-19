const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct)

  } catch (err) {
    res.status(500).json(err);
  }
});
 
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.SecretKey
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//        $set: req.body ,
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedUser)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

 router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
  try{
   await Product.findByIdAndDelete(req.params.id)
     res.status(200).json("Ürün silindi...");
   }
   catch(err) {
     res.status(500).json(err);
   }
 })

router.get("/find/:id", async (req,res)=>{
  try{
   const product =  await Product.findById(req.params.id)
   res.status(200).json(product);

  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.get("/getall", async (req,res)=>{
  const query = req.query.new
  try{
   const product =  query ? await Product.find().sort({_id : -1}).limit(5) : await Product.find()
   res.status(200).json(product);

  }
  catch(err) {
    res.status(500).json(err);
  }
})

// router.get("/stats",verifyTokenAndAdmin, async (req,res)=>{
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

//   try{
//     const data = await User.aggregate([
//       {$match : {createdAt: {$gte: lastYear}}},
//       {
//         $project: {
//           month : {$month:"$createdAt"},
//         },
//       },
//       {
//         $group:{
//           _id:"$month",
//           total:{$sum: 1},
//         }
//       }
//     ])
//     res.status(200).json(data)
//   }
//   catch(err)
//   {
//     res.status(500).json(err)
//   }

// })

module.exports = router;
