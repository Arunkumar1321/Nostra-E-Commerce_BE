import { productModel } from "./pSchema.mjs"

const product_controller={
    
    product_get:async(req,res)=>{
        
      const product= await productModel.find({})
      res.json({
        success:"true",
        product})
    },
        single_product_get:async(req,res)=>{
            try{
                const sproduct=await productModel.findById({_id:req.params.id})
                res.json(sproduct)
            } catch(err){
             res.status(404).json(err.message)
            }
    },
    search_product_get: async (req, res) => {
        try {
const q = req.query.q || '';
const category = req.query.category || '';

const filter = {};

if (q && category) {
    filter.$and = [
        { name: { $regex: q, $options: 'i' } },
        { category: { $regex: category, $options: 'i' } }
    ]
} else if (q) {
    filter.name = { $regex: q, $options: 'i' }
} else if (category) {
    const categories=category.split(',')
    if(categories.length>1){
        filter.category={$in:categories}
    }else{
        filter.category = { $regex: category, $options: 'i' }
    }
}

const products = await productModel
    .find(filter)
    .select('name price image ratings category numOfReviews')
    .lean();
                
            res.status(200).json({ success: true, count: products.length, data: products });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }

    },

    product_patch:(req,res)=>{
        res.send("hii this is product page where u can update product ")
    },
    product_put:(req,res)=>{
       res.send("hii this is product page where u can update whole product")
    },
    product_delete:(req,res)=>{
       res.send("hii this is product page where u can delete a product")
    },
     product_post:(req,res)=>{
       res.send("hii this is product page where u can insert a new product")
    },
}
export default product_controller