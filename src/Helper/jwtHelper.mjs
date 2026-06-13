
import jwt from "jsonwebtoken"
const secret = process.env.SECRET
const maxAge=3*24*60*60
export const generateToken = (id)=>{
  return jwt.sign({id},secret,{expiresIn:maxAge})
}

