import jwt from "jsonwebtoken"
import { User } from "../user/Schema.mjs"
export const requireAuth = async(req,res,next)=>{
    // verify authorization
    const {authorization}=req.headers
    if(!authorization){
      return  res.status(401).json({error:"Authorization token required"})
    }
    const token = authorization.split(' ')[1]
    try{
     const {id} = jwt.verify(token,process.env.SECRET)
    const user = await User.findOne({_id: id}).select('_id role')
    if(!user){
      return res.status(401).json({error:"User not found"})
    }
    req.user = user
    next();
      
    }catch(error){
        console.log(error)
        res.status(401).json({error:"Request denied"})

    }
}

export const requireAdmin = async(req, res, next) => {
  if(!req.user){
    return res.status(401).json({error:"Authentication token required"})
  }

  if(req.user.role !== "admin"){
    return res.status(403).json({error:"Admin access denied"})
  }

  next()
}
