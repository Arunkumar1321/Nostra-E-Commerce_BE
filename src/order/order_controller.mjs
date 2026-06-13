import ordermodel from "./oSchema.mjs"
const order_controller={
   create_Order:async(req,res)=>{
    
   const cartItems=req.body
   const amount =Number( cartItems.reduce((acc,item)=>(acc+item.qty*item.products.price),0)).toFixed(2)
   const status="pending"
   try{
   const order =await ordermodel.create({cartItems,amount,status})
    res.status(201).json({success:"true",status:"Order placed",order})
   }catch(err){
    console.log(err.message)
    res.status(400).json({error:"Order failed"})
   }

   }
}
export default order_controller