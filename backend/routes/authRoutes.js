import { Router } from "express";
import{
    post_login,
    post_signup
} from '../controllers/authControllers.js';
import requireAuth from "../middleware/requireAuth.js";
import userRoutes from './userRoutes.js';

const router = Router();


router.post('/login' , post_login);
router.post('/signup' , post_signup);


router.use('/' ,  requireAuth , userRoutes);

export default router;