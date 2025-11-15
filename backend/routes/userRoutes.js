import { Router } from "express";
import { get_members, post_members } from "../controllers/userController.js";


const router = Router();


router.get('/members' , get_members);
router.post('/members/:id' , post_members)

export default router;