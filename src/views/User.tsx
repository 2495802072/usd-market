import './css/User.css'
import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const User: React.FC = () => {
    const navigate = useNavigate();
    const [openPassword, setOpenPassword] = React.useState(false);

    const [username, setUsername] = React.useState('unnamed');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('email@unnamed.com');
    const [phone, setPhone] = React.useState('none');

    const loginOut = () => {
        Cookies.remove('token');
        console.log("用户登出");
        navigate('/login');
    }

    const turnOnPasswordBox = () => {
        setOpenPassword(true);
    }


    return (
        <div id="userRoot">

            <div className={"CardMain"}>
                <form className={"w-100"} action="">
                <table className={"userInfoTable"}>
                    <tbody>
                    <tr>
                        <td></td>
                        <td><label className={"w-100"} style={{textAlign:"left"}}>NO.{Cookies.get('token')}</label></td>
                    </tr>
                    <tr style={{borderTop:"1px solid var(--shop-border-color)"}}>
                        <td>
                            <div className={"w-100"} style={{position: "relative",height:"40px"}}>
                                <img className={"imgBox"} src="" alt="" />
                            </div>
                        </td>
                        <td><input className={"form-control"} type="text" value={username} onChange={(e) =>{setUsername(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td>新密码</td>
                        {openPassword ?
                            <td><input className={"form-control"} type="password" value={''} onChange={(e) =>{setPassword(e.target.value)}} onBlurCapture={loginOut}/></td> :
                            <a className={"btn btn-golds"} onClick={turnOnPasswordBox}>修改密码</a>}
                    </tr>
                    <tr>
                        <td>邮箱</td>
                        <td><input className={"form-control"} type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/></td>
                    </tr>
                    <tr>
                        <td>手机号</td>
                        <td><input className={"form-control"} type="text" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }}/></td>
                    </tr>
                    <tr>
                        <td>用户名</td>
                        <td><input className={"form-control"} type="text" value={username}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <br/>
                        </td>
                    </tr>
                    <tr style={{borderTop:"1px solid var(--shop-border-color)",borderBottom:"1px solid var(--shop-border-color)"}}>
                        <td colSpan={2}><a href="" className={"btn btn-gold w-100"} onClick={loginOut}>退出登录</a></td>
                    </tr>
                    </tbody>
                </table>
                </form>

            </div>


            {/*<div id={'box1'} className={'d-flex align-items-center'}>*/}
            {/*    <img src="" alt="用户头像" width={'100px'} height={'100px'} />*/}
            {/*    <h2>User ID</h2>*/}
            {/*    <div style={{flex: 2}}/>*/}
            {/*    <p>编辑资料&gt;</p>*/}
            {/*</div>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<div id={'box2'} className={'d-flex align-items-center'}>*/}
            {/*    <table className={'w-100'}>*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            <td><a href="#">修改邮箱</a></td>*/}
            {/*            <td><a href="#">修改密码</a></td>*/}
            {/*            <td><a href="#">修改手机号</a></td>*/}
            {/*        </tr>*/}
            {/*        <tr>*/}
            {/*            <td colSpan={3} style={{textAlign: "center"}}>退出登录</td>*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
        </div>
    )
}

export default User;