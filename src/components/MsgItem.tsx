import React from "react";
import Cookies from "js-cookie";

interface MsgItemProps {
    key: number,
    data:{
        messageId: number,
        sender: {
            userId: number,
            username: string,
            email: string,
            phone: string,
            role: string,
        },
        receiver: {
            userId: number,
            username: string,
            email: string,
            phone: string,
            role: string,
        },
        content: string,
        status: string,
        createdAt: string
    }
}

const msgLine = {
    backgroundColor: 'var(--shop-background-color)',
    padding: '5px',
    borderRadius: '5px',
    marginBottom: '10px'
}

const dateStyle = {
    fontSize: '10px'
}

const MsgItem:React.FC<MsgItemProps> = ({data}) => {
    const userId = Cookies.get("token"); // userId 是 string | undefined
    const flag: boolean = userId !== undefined && data.sender.userId.toString() === userId;

    function formatDate(dateString:string) {
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    return (
        <>
            <div className={"w-100 d-flex"} style={ flag ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}}>
                <img src="" alt="" width={30} height={30} style={{borderRadius:'50%',border:'1px solid var(--shop-border-color)',margin: '5px'}}/>
                <div style={flag ? {textAlign:'right'} : {textAlign:'left'}}>
                    <label style={dateStyle}>{formatDate(data.createdAt)}</label>
                    <div style={msgLine}>
                        {data.content}
                    </div>
                </div>
            </div>
        </>
    )
};

export default MsgItem;