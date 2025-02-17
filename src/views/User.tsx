import './css/User.css'
import React, {FormEvent, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../authentication/AuthContext.tsx";
import {useError} from "../components/ErrorContext.tsx";

const User: React.FC = () => {
    const { showMsg } = useError();
    const navigate = useNavigate();
    const loginState = useAuth();
    const [openPassword, setOpenPassword] = React.useState(false);

    const [userId, _setUserId] = React.useState(Cookies.get('token'));
    const [username, setUsername] = React.useState(loginState.state.user?.username || '');
    const [password, setPassword] = React.useState(loginState.state.user?.password || '');
    const [email, setEmail] = React.useState(loginState.state.user?.email || '');
    const [phone, setPhone] = React.useState(loginState.state.user?.phone || '');

    const loginOut = () => {
        Cookies.remove('token');
        console.log("用户登出");
        navigate('/login');
    }

    useEffect(() => {
        if (loginState.state.user) {
            setUsername(loginState.state.user.username || '');
            setPassword(loginState.state.user.password || '');
            setEmail(loginState.state.user.email || '');
            setPhone(loginState.state.user.phone || '');
        }
    }, [loginState.state.user]);

    const turnOnPasswordBox = () => {
        setOpenPassword(true);
    }

    const changeUserInfo = async (event: FormEvent) =>{
        event.preventDefault();
        //update用户信息请求体
        const response = await fetch('http://47.121.115.160:8280/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, username, password, email, phone  })
        });

        if (response.ok) {
            const {token, user} = await response.json();
            console.log("user : " + user);
            console.log("token : " + token);
            showMsg("修改成功");
        }else{
            //处理错误
            showMsg("服务获取失败");
        }

    }


    return (
        <div id="userRoot">

            <div className={"CardMain"}>
                <form className={"w-100"} action="">
                <table className={"userInfoTable"}>
                    <tbody>
                    <tr>
                        <td></td>
                        <td><label className={"w-100"} style={{textAlign:"left"}}>NO.{userId}</label></td>
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