import './css/Contacts.css'
import React from "react";

interface ContactsProps {
    key: number,
    userId: number,
    name?: string,
    email?: string,
    phone?: string,
    imgUrl?: string,
    setReceiveId: (userId:number) => void
}


const Contacts:React.FC<ContactsProps> = ({userId,name="unNamed",setReceiveId = () => {}}) =>{

    const setContact = () => {
        setReceiveId(userId);
    }

    return(

        <>
            <div className={"w-100 h-100 p-1"}>
                {/*TODO 按钮点击打开聊天，删除联系人*/}
                <div className={'w-100 btn btn-gold mb-1'} style={{border:'0'}} onClick={setContact}>
                    <img className={"contactsImg"} src="" alt="" width={40} height={40} />
                    <label>{name}</label>
                </div>
            </div>
        </>
    )
}

export default Contacts;