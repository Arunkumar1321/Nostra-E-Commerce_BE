import cartModel from "./cartSchema.mjs"
const cartController={
    add_cart:async(req,res)=>{
      try {
    const { product, quantity } = req.body
    const userId = req.user._id

    let cart = await cartModel.findOne({ user: userId })

    if (!cart) {
   
      cart = new cartModel({ user: userId, items: [] })
    }

   
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product
    ) 

    if (existingItem) {

      existingItem.quantity += quantity
    } else {
  
      cart.items.push({ product: product, quantity })
    }

    await cart.save()
    res.status(200).json({ message: "Added to cart", cart })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
},
      get_cart:async(req,res)=>{
       const userId=req.user._id
       try{
       if(!userId){
        return res.status(404).json({error:"UserId not found"})
       }
       const cart = await cartModel.find({ user: userId }).populate("items.product")
       if(!cart){
        return res.json({message:"Haven't any added into cart"})
       }else{
        res.json(cart)
       }
    }catch(err){
        res.status(500).json({error:err.message})
    }
    },
      update_cart:async(req,res)=>{
        try{
           const {product,quantity}=req.body
           const userId=req.user._id
           const productId=req.params.productid
           const cart=await cartModel.findOne({user:userId})
           if(!cart){
           return res.status(404).json({error:"Cart not found"})
           }
           const items=cart.items.find((item)=>item.product.toString()===productId)
           if(!items){
            return res.status(404).json({error:"Item not found in the cart"})
           }
           items.quantity=quantity
           await cart.save()
           res.status(201).json({message:"Cart updated Sucessfully",cart})

        }catch(err){
            res.status(500).json({error:err.message})
        }
       
    },
      delete_particular_cart:async(req,res)=>{
        try{
            const userId=req.user._id
            const{product}=req.body
            const productId=req.params.productid
            if(!userId){
                return res.status(404).json({error:"User authetication required"})
            }
            const cart= await cartModel.findOne({user:userId}) 
            if(!cart){
                return res.status(404).json({message:"Cart not found"})
            }
            cart.items = cart.items.filter((item)=>item.product.toString()!==product)
            await cart.save()
            res.status(200).json({message:"Item removed",cart})


        }catch(err){
            res.status(404).json({error:err.message})
        }
    },
      clear_cart:async(req,res)=>{
        try{
        const userId = req.user._id
        if(!userId){
            return res.status(400).json({error:"User not found"})
        }
        const cart=await cartModel.deleteMany({user:userId})
        res.status(200).json({message:"Cart cleared"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
    }
}
export default cartController