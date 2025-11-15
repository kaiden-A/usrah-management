import { Router } from "express";
import { 
    create_sessions, 
    get_dashboard, 
    get_members, 
    post_members, 
    sign_attendence
} from "../controllers/userController.js";


const router = Router();

router.get('/dashboard' , get_dashboard);

router.get('/members' , get_members);
router.post('/members/:id' , post_members);

router.post('/sessions' , create_sessions);

router.post('/attendances' , sign_attendence);

export default router;