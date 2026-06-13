
import jwt from "jsonwebtoken"

const maxAge=3*24*60*60
export const generateToken = (id)=>{
  const secret = process.env.SECRET
  return jwt.sign({id},secret,{expiresIn:maxAge})
}

