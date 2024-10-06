import { useState } from "react";
import SubscribeForm from "../../components/SubscribeForm";
import TransactionHistory from "../../components/transactionHistory";
import './home.css'

function Home() {

    const [activeTab,setActiveTab] = useState(0);

    const seleccionar = (index) => {
        setActiveTab(index);
    }
 
    return(
        <>
        <div className="container">
            <ul className='tabs'>
                <li className={activeTab==0?'active':''} onClick={()=>seleccionar(0)}>Suscribirse</li>
                <li className={activeTab==1?'active':''} onClick={()=>seleccionar(1)}>Transacciones</li>
            </ul>
            <div className="tab-content">
                {activeTab===0 && <SubscribeForm/>}
                {activeTab===1 && <TransactionHistory/>}
            </div>
        </div>
        </>
    )
}

export default Home;