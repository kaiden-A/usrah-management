

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
                SELECT DATE_FORMAT(s.session_date, '%d %b %Y') AS sessions_date ,
                s.session_name , COUNT(a.members_id) AS present , 
                ( SELECT COUNT(*) FROM MEMBERS WHERE usrah_id = ?) - COUNT(a.members_id) AS absent,
                COUNT(a.members_id)/  ( SELECT COUNT(*) FROM MEMBERS WHERE usrah_id = ?) * 100 AS percentage_rate
                FROM SESSIONS s LEFT JOIN ATTENDANCE a ON s.SESSIONS_ID = a.SESSIONS_ID
                WHERE usrah_id = ?
                GROUP BY DATE_FORMAT(s.session_date, '%d %b %Y') , s.session_name;
            `,
            [naqib.usrah_id , naqib.usrah_id , naqib.usrah_id]
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

export const get_attendance = async (req , res) => {


    const naqib = req.user;
    const db = req.app.locals.db;

    try{

        const [sessionRow] = await db.query(
            `SELECT sessions_id , session_name FROM SESSIONS
            WHERE usrah_id = ?`,
            [naqib.usrah_id]
        )

        const [attendRow] = await db.query(
            `
                SELECT 
                    m.members_id,
                    m.members_name,
                    s.sessions_id,
                    s.session_name,
                    a.members_id AS attended
                FROM members m
                JOIN sessions s 
                    ON s.usrah_id = ?
                LEFT JOIN attendance a 
                    ON a.members_id = m.members_id
                    AND a.sessions_id = s.sessions_id
                WHERE m.usrah_id = ?
                ORDER BY m.members_id, s.sessions_id;
            `,
            [naqib.usrah_id , naqib.usrah_id]
        )

        res.json({sessions : sessionRow || [], attendance : attendRow || []})
        

    }catch(err){
        console.log(err);
    }
}