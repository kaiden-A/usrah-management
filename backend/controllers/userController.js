

export const get_dashboard = async (req , res) => {

    const db = req.app.locals.db;
    const naqib = req.user;

    try{

        const [rowsMember] = await db.query(
            `
                SELECT COUNT(members_id) AS total_members
                FROM MEMBERS
                WHERE usrah_id = ?
            `,
            [naqib.usrah_id]
        )

        const [rowsSession] = await db.query(
            `
                SELECT COUNT(sessions_id) as total_session
                FROM sessions
                WHERE usrah_id = ?
            ` ,
            [naqib.usrah_id]
        )


        const [rowsDashboard] = await db.query(

            `
                SELECT m.members_id , m.members_name , COUNT(s.sessions_id) AS present,
                (
                    ABS(COUNT(s.sessions_id) - (SELECT COUNT(*) FROM SESSIONS WHERE USRAH_ID = ? ))

                ) AS absent,
                (
                    COUNT(s.sessions_id) /( SELECT COUNT(*) FROM SESSIONS WHERE USRAH_ID = ?) 
                ) * 100 AS percentage_rate FROM members m 
                JOIN attendance a ON m.members_id = a.members_id JOIN sessions s ON s.sessions_id = a.sessions_id
                GROUP BY m.members_id ,  m.members_name;
            `,
            [naqib.usrah_id , naqib.usrah_id]
        )

        const totalMembers = rowsMember[0].total_members;
        const totalSessions = rowsSession[0].total_session;
        const membersData = rowsDashboard;

        res.json({totalMembers , totalSessions , membersData})

    }catch(err){
        console.log(err);
    }
}

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


        res.json({members : rows})

    }catch(err){
        console.log(err);
    }
}

export const create_sessions = async (req , res) => {

    const {sessionName , date} = req.body;
    const naqib = req.user;
    const db = req.app.locals.db;

    try{

        const createdSession = db.query(
            `
            INSERT INTO SESSIONS (SESSION_NAME , SESSION_DATE , USRAH_ID)
            VALUES(? , ? , ?)
            ` , 
            [sessionName , date , naqib.usrah_id]
        )

        if(!createdSession){
            return res.status(401).json({error : true , msg : 'Error when creating sessions'})
        }

        res.json({success : true , msg : 'successfully creates a sessions'})

    }catch(err){
        console.log(err);
    }
}

export const sign_attendence = (req , res) => {

    const {sessionId , membersId } = req.body;
    const db = req.app.locals.db;

    try{

        const signAttendence = db.query(
            `
                INSERT INTO ATTENDANCE VALUES(? , ?)
            ` ,
            [sessionId , membersId]
        )

        if(!signAttendence){
            return res.status(401).json({error : true , msg : 'error in signing attendence'})
        }

        res.json({success : true , msg :  'successfully sign attendance'})

    }catch(err){
        console.log(err);
    }
}