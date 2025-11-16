import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Members from "./components/Members";
import Attendance from "./components/Attendance";
import Footer from "../Global/Footer";


function MainPage(){

    const [tab , setTab] = useState('Dashboard');

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
            </main>
            <Footer/>
        </>
    )

}

export default MainPage;