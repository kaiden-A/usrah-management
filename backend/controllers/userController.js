

export const post_members = async (req , res) => {

    const db = req.app.locals.db;
    const naqib = req.user;

    const {name , email} = req.body;
    const memberId = req.params.id;

    try{

        const createMembers = await db.query(`INSERT INTO MEMBERS VALUES(? , ? , ? , ?)` ,
            [memberId , name , email , naqib.usrah_id]
        );

        if(!createMembers){
            return res.status(401).json({error : true , msg : "Unsucceffuly create a member"})
        }

        res.json({success : true , msg : createMembers})

    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }
}

export const get_members = async ( req , res) => {

    const db = req.app.locals.db;
    const naqib = req.user;

    try{

        const [rows] = await db.query(
            `
            SELECT members_id , members_name , email 
            FROM MEMBERS 
            WHERE usrah_id = ?
            ` ,
            [naqib.usrah_id]
        );

        console.log(rows);

        res.json({members : rows})

    }catch(err){
        console.log(err);
    }
}