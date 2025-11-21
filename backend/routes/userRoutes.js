import { Router } from "express";
import { 
    create_sessions, 
    delete_attedances, 
    delete_members, 
    delete_sessions, 
    get_attendance, 
    get_dashboard, 
    get_members, 
    get_sessions, 
    post_members, 
    sign_attendence
} from "../controllers/userController.js";


const router = Router();

router.get('/' , (req , res) => {
    res.json({cookies : true , msg : 'have cookies'})
})

router.get('/dashboard' , get_dashboard);

router.get('/members' , get_members);
router.post('/members/:id' , post_members);
router.delete('/members/:id' , delete_members);

router.get('/sessions' , get_sessions)
router.post('/sessions' , create_sessions);
router.delete('/sessions/:id' , delete_sessions)

router.get('/attendances' , get_attendance);
router.post('/attendances' , sign_attendence);
router.delete('/attendances' , delete_attedances);


export default router;