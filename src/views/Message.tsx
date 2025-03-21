import './css/message.css'
import TopBar from "../components/TopBar.tsx";
import CommunicateBox from "../components/CommunicateBox.tsx";
import Contacts from "../components/Contacts.tsx";
import React, {useEffect} from "react";
import Cookies from "js-cookie";
import {useError} from "../components/ErrorContext.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface ContactType  {
    user: {
        userId: number,
    },
    recipient: {
        userId: number,
        username: string,
        email: string,
        phone: string,
        role: string,
    }
}

const MessagePage = () => {
    const { showError } = useError();
    const [userId] = React.useState(Cookies.get('token'));
    const [contactList, setContactList] = React.useState<ContactType[]>([]);
    const [receiveId, setReceiveId] = React.useState(-1);

    const fetchContacts = async () => {
        try {
            const response = await fetch(apiUrl+'/api/contact/user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId})
            });

            if(!response.ok){
                showError(await response.text());
                return;
            }

            const data = await response.json();
            console.log("响应：");
            console.log(data);
            setContactList(data);
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchContacts().then();
    }, []);


    return (
        <>
            <TopBar />
            <div className={"w-100 h-100 d-flex align-items-center"}>
                {/*TODO 手机端卷起联系人栏*/}
                <div className="message-contacts">
                    {contactList.map((item,index) => (
                        <Contacts key={index} userId={item.recipient.userId} name={item.recipient.username} email={item.recipient.email} phone={item.recipient.phone} setReceiveId={setReceiveId}/>
                    ))}
                </div>
                <div className="message-main">
                    <CommunicateBox receiveId={receiveId}/>
                </div>
            </div>
        </>
    )
}

export default MessagePage;
