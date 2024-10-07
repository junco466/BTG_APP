import { useState } from "react";
import SubscribeForm from "../../components/SubscribeForm";
import TransactionHistory from "../../components/transactionHistory";
import './home.css'
import UserProfile from "../../components/UserProfile";

function Home() {

    const [activeTab,setActiveTab] = useState(0);

    const seleccionar = (index) => {
        setActiveTab(index);
    }
 
    return(
        <>
        <div className="container-app">
            <ul className='tabs'>
                <li className={activeTab==0?'active':''} onClick={()=>seleccionar(0)}>Mi Perfil</li>
                <li className={activeTab==1?'active':''} onClick={()=>seleccionar(1)}>Suscribirse</li>
                <li className={activeTab==2?'active':''} onClick={()=>seleccionar(2)}>Transacciones</li>
            </ul>
            <div className="tab-content">
                {activeTab===0 && <UserProfile/>}
                {activeTab===1 && <SubscribeForm/>}
                {activeTab===2 && <TransactionHistory/>}
            </div>
        </div>
        </>
    )
}

export default Home;