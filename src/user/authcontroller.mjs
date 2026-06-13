import { matchedData, validationResult } from "express-validator"
import { compare, hashpassword } from "../Helper/userhash.mjs"
import { User } from "./Schema.mjs"
import { generateToken } from "../Helper/jwtHelper.mjs"


const Authcontroller={

login_post : async(req,res)=>{
 const result = validationResult(req)
 if(!result.isEmpty()){
   return res.status(400).send({errors:result.array()[0].msg})
 }
 const body = matchedData(req)
 const user=await User.findOne({username:body.username})
 if(!user){
  return res.status(400).send({error:"User not found"})
}
 const password = await compare(body.password, user.password)
 console.log(password)
 if(!password){
  return res.status(400).send({error:"Invalid Username or password"})
 }
 const token = generateToken(user._id)
res.status(200).send({user:user.username,token})
},

signin_post : async(req,res)=>{
 const result = validationResult(req)
 if(!result.isEmpty()){
   return res.status(400).send({errors:result.array()[0].msg})
 }
 const body = matchedData(req)
 body.password=await hashpassword(body.password)
 const euser= await User.findOne({username:body.username})
 if(euser){
    return res.status(400).send({error:"User already exist,Go back to Login"})
 }
 const nuser=await User.create({
    username:body.username,
    password:body.password,
    role: "user"
 })
 const token = generateToken(nuser._id)
 res.status(201).send({user:nuser.username,token})
},
}
export default Authcontroller