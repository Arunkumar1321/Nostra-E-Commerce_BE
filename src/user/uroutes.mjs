import { Router } from "express";
import Authcontroller from "./authcontroller.mjs";
import {checkSchema} from "express-validator"
import UserValidator from "./Validator.mjs";

const Userroutes = Router();
Userroutes.post("/api/signin",checkSchema(UserValidator),Authcontroller.signin_post);
Userroutes.post("/api/login",checkSchema(UserValidator),Authcontroller.login_post);
export default Userroutes
