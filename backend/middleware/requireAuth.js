import jwt from 'jsonwebtoken';


export default async function requireAuth(req , res , next){

    const token = req.cookies.jwt;
    const db = req.app.locals.db;

    try{

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(404).json({error : true , cookies : false})
        }

        const [rows]= await db.query(`SELECT members_id , usrah_id FROM NUQABA WHERE naqib_id = ? ` ,
            [decodedToken.id]
        )

        if(rows.length === 0){
            return res.status(401).json({error : true , msg : 'user not found'})
        }

        req.user = rows[0];
        next();

    }catch(err){
        console.log(err);

        res.json({error : true , cookies : false})
    }
}