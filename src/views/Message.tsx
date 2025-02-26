import './css/message.css'
import TopBar from "../components/TopBar.tsx";
import CommunicateBox from "../components/CommunicateBox.tsx";
import Contacts from "../components/Contacts.tsx";

const MessagePage = () => {



    return (
        <>
            <TopBar/>
            <div className={"w-100 h-100 d-flex align-items-center"}>
                {/*TODO 手机端卷起联系人栏*/}
                <div className="message-contacts">
                    {/*TODO 联系人组件*/}
                    <Contacts />
                    <Contacts />
                    <Contacts />
                </div>
                <div className="message-main">
                    {/*TODO 聊天页面组件*/}
                    <CommunicateBox></CommunicateBox>
                </div>
            </div>
        </>
    )
}

export default MessagePage;