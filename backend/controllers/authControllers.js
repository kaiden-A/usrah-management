import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function hashedPassword(pasword){

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pasword , salt);

    return hashPass;
}

async function comparePassword(password , hashPass){

    return await bcrypt.compare(password , hashPass)
    
}

const maxAge = 1 * 24 * 60 * 60;

function createToken(id){
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : maxAge})
}

export const post_login = async (req , res) => {

    const {naqibId , password} = req.body;

    const db = req.app.locals.db;

    try{

        const [rows]= await db.query("SELECT NAQIB_ID , NAQIB_NAME , HASH_PASSWORD FROM NUQABA WHERE NAQIB_ID = ?" ,
            [naqibId]
        )

        if(rows.length === 0){
            return res.status(401).json({error : true , msg : "User doesnt exist"})
        }
        
        const { NAQIB_ID , NAQIB_NAME, HASH_PASSWORD } = rows[0];

        const isNaqib = await comparePassword(password , HASH_PASSWORD);

        if(!isNaqib){
            return res.status(401).json({error : true , msg : "Incorrect Password"})
        }

        const token = createToken(NAQIB_ID);

        res.cookie('jwt' , token ,
        {   httpOnly : true , 
            maxAge : maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        } );
        res.json({success : true , msg : `Hi ${NAQIB_NAME}`})

    }catch(err){
        console.log(err);
    }

}

export const post_signup = async (req , res) => {
    
    const {  naqibId , name , email , password , usrahId} = req.body;

    const db = req.app.locals.db;

    try{

        const hashPass = await hashedPassword(password);
        const createUser = await db.query(`INSERT INTO NUQABA VALUES(? , ? , ? , ? , ?)` ,
            [naqibId , name , email , hashPass , usrahId]
        );

        if(!createUser){
            return res.status(401).json({error : true , msg : 'Fail create user'})
        }

        const token = createToken(naqibId);
        
        res.cookie('jwt' , token ,
        {   httpOnly : true , 
            maxAge : maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        } );

        res.json({success : true , msg : createUser});


    }catch(err){
        console.log(err);
        res.status(500).json({err : err?.sqlMessage})
    }
}