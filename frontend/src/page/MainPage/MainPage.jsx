import { useState , useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Members from "./components/Members";
import Attendance from "./components/Attendance";
import Sessions from "./components/Sessions";
import Footer from "../Global/Footer";
import LoadingSpinner from "../Global/LoadingSpinner";


function MainPage(){

    const [tab , setTab] = useState('Dashboard');
    const [loading , setLoading] = useState(true);

    useEffect(() => {

        let intervalId;
        let isMounted = true;
        const activateBackend = async() => {


            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`);
                
                if(responses.ok && isMounted){
                    setLoading(false);
                    clearInterval(intervalId);
                }


            }catch(err){
                console.log("backend still sleep...")
            }
        }

        activateBackend()
        intervalId = setInterval(activateBackend , 2000);
        
        return () => { clearInterval(intervalId); isMounted = false}
    } , [])

    if(loading){
        return <LoadingSpinner text="awakening the backend..." size="large"/>
    }

    

    return(
        <>
            <title>Usrah Management System</title>
            <Header 
                tab={tab}
                setTab={setTab}
            />
            <main className="container">
                {tab === 'Dashboard' && <Dashboard/>}
                {tab === 'Members' && <Members/>}
                {tab === 'Attendance' && <Attendance/>}
                {tab === 'Sessions' && <Sessions/>}
            </main>
            <Footer/>
        </>
    )

}

export default MainPage;