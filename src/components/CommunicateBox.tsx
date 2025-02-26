import './css/CommnicateBox.css';

const CommunicateBox = () => {
    
    return (
        <>
            <div className={"w-100 h-100 communicate-main-box"}>
                <div className={"d-flex flex-column"} style={{padding: "10px",flex:2}}>
                    聊天窗口
                </div>
                <div className={"input-group messagesBox"}>
                    <label className={"input-group-text"}>发送消息</label>
                    <input type="text" className={"form-control"}/>
                    <button className={"btn-gold btn"}> Enter</button>
                </div>
            </div>
        </>
    );
};

export default CommunicateBox;