import express from "express";
import auth from "../routes/auth.routes";
import user from "../routes/user.routes";
const router = express.Router();

router.get('/healthchecker',(_,res)=>{
  res.sendStatus(200);  
})

router.use(user);
router.use(auth);

export default router;