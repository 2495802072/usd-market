import './css/CommnicateBox.css';
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import MsgItem from "./MsgItem.tsx";
import {useError} from "./ErrorContext.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface communicateBoxType {
    receiveId?: number;
}

interface messageType {
    "messageId": number,
    "sender": {
        "userId": number,
        "username": string,
        "email": string,
        "phone": string,
        "role": string,
    },
    "receiver": {
        "userId": number,
        "username": string,
        "email": string,
        "phone": string,
        "role": string,
    },
    "content": string,
    "status": string,
    "createdAt": string
}

const CommunicateBox:React.FC<communicateBoxType> = ({receiveId}) => {
    const userId = Cookies.get("token");
    const { showError } = useError();
    const [messageList, setMessageList] = useState<messageType[]>([]);
    const [content, setContent] = useState("");

    // 定义获取消息的fetch
    const fetchMessages = async () => {
        try {
            const response = await fetch(apiUrl+'/api/messages/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: {userId:userId},
                    recipient: {userId:receiveId}
                })
            });

            if(!response.ok){
                showError(await response.text());
                return;
            }

            const data = await response.json();
            console.log("响应：");
            console.log(data);
            setMessageList(data);
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // 定义发送消息的fetch
    const sendMessages = async () => {
        try {
            const response = await fetch(apiUrl+'/api/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    sender: {
                        userId: userId
                    },
                    receiver: {
                        userId: receiveId
                    },
                    content: content,
                    status: "送达"
                })
            });

            if(!response.ok){
                showError(await response.text());
                return;
            }

            const data = await response.json();
            console.log("响应：");
            console.log(data);
            fetchMessages().then();
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        if(receiveId){
            //获取消息列表
            fetchMessages().then();
        }
    }, [receiveId]);

    return (
        <>
            <div className={"w-100 h-100 communicate-main-box"}>
                <div className={"d-flex flex-column"} style={{padding: "10px",flex:2}}>
                    {messageList.map((item,index) => (
                        <MsgItem data={item} key={index}/>
                    ))}
                </div>
                <div className={"input-group messagesBox"}>
                    <label className={"input-group-text"}>发送消息</label>
                    <input type="text" className={"form-control"} onChange={(e) => setContent(e.target.value)}/>
                    <button className={"btn-gold btn"} onClick={() => {
                        if(content != '') {
                            sendMessages().then();
                            // TODO 清空发送框
                        }else {
                            showError("发送信息不可为空");
                        }
                    }}>Enter</button>
                </div>
            </div>
        </>
    );
};

export default CommunicateBox;