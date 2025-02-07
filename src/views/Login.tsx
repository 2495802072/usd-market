import './css/Login.css'
import {useRef, useState, FormEvent } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../authentication/AuthContext.tsx';
import { useError } from "../components/ErrorContext.tsx";
import ImgContainer from "../components/ImgContainer2.tsx";
import gamepads from '../assets/img/游戏手柄.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const rg_userRef = useRef<HTMLInputElement | null>(null);
    const rg_passRef = useRef<HTMLInputElement | null>(null);
    const rg_emlRef = useRef<HTMLInputElement | null>(null);
    const rg_roleRef = useRef<HTMLSelectElement  | null>(null);

    const navigate = useNavigate();
    //确认登录状态
    const { dispatch } = useAuth();
    //Err弹窗预备
    const { showError } = useError();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();

        // 登录API
        const response = await fetch('http://47.121.115.160:8280/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const { token, user} = await response.json();
            console.log("user : "+user);
            console.log("token : "+token);

            // 保存JWT
            sessionStorage.setItem('token', token);

            // 更新应用状态（例如使用Context或Redux）
            dispatch({
                type: 'LOGIN',
                payload: user
            });

            // 重定向到仪表盘
            navigate('/');
        } else {
            // 处理错误
            console.error('登录失败');
        }
    };

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        //缺少用户名
        if (!username){
            showError('请输入用户名');
            if (rg_userRef.current) {
                if ("focus" in rg_userRef.current) {
                    rg_userRef.current.focus();
                }
            }
            return;
        }
        //缺少密码
        if (password.length < 6) {
            showError('密码至少需要6位');
            if(rg_passRef.current){
                if ("focus" in rg_passRef.current) {
                    rg_passRef.current.focus();
                }
            }
            return;
        }
        //缺少邮箱
        if (!email) {
            showError('请输入邮箱');
            if(rg_emlRef.current){
                if ("focus" in rg_emlRef.current) {
                    rg_emlRef.current.focus();
                }
            }
            return;
        }else{
            //判断邮箱格式正确
            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailPattern.test(email)){
                showError('邮箱格式不正确');
                showError('邮箱格式不正确');
                if(rg_emlRef.current){
                    if ("focus" in rg_emlRef.current) {
                        rg_emlRef.current.focus();
                    }
                }
                return;
            }
        }
        //缺少role
        if(!role){
            showError('请选择你的身份');
            if(rg_roleRef.current){
                if ("focus" in rg_roleRef.current) {
                    rg_roleRef.current.focus();
                }
            }
            return;
        }

        // 注册API
        const response = await fetch('http://47.121.115.160:8280/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, phone, role })
        });

        if (response.ok) {
            const { token, user} = await response.json();
            console.log("user : "+user);
            console.log("token : "+token);

            // 保存JWT
            sessionStorage.setItem('token', token);

            // 更新应用状态（例如使用Context或Redux）
            dispatch({
                type: 'LOGIN',
                payload: user
            });

            // 重定向到仪表盘
            navigate('/');
        } else {
            // 处理错误
            showError(await response.text());
        }
    }


    return (
        <>
            <ImgContainer imageUrl={gamepads} x={800} y={450} width={150} height={150} />

            <div className="login_register">

                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#login" role="tab"
                           aria-controls="login" aria-selected="true">登录</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#register" role="tab"
                           aria-controls="register" aria-selected="false">注册</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="home-tab">
                        <form onSubmit={handleLogin} className={"d-flex justify-content-center"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>用户名:</td>
                                    <td><input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    /></td>
                                </tr>
                                <tr>
                                    <td>密码:</td>
                                    <td><input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    /></td>
                                </tr>
                                </tbody>
                            </table>
                            <input className={'btn btn-gold'} type={'submit'} value={'登录'}/>
                        </form>
                    </div>


                    <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="profile-tab">
                        <form onSubmit={handleRegister} className={"d-flex justify-content-center"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>用户名<label className={'ipt-msg'}>*</label>:</td>
                                    <td><input
                                        id={'register_username_box'}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        ref={rg_userRef}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>邮箱<label className={'ipt-msg'}>*</label>:</td>
                                    <td><input
                                        id={'register_email_box'}
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        ref={rg_emlRef}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>密码<label className={'ipt-msg'}>*</label>:</td>
                                    <td><input
                                        id={'register_password_box'}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        ref={rg_passRef}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>手机号:</td>
                                    <td><input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>身份<label className={'ipt-msg'}>*</label>:</td>
                                    <td>
                                        <select className={'form-select'} id="role" name="role" value={role} ref={rg_roleRef}
                                                onChange={(e) => setRole(e.target.value)}>
                                            <option value='' disabled>请选择</option>
                                            <option value="buyer">买家</option>
                                            <option value="seller">卖家</option>
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            &nbsp;&nbsp;
                            <input className={'btn btn-gold'} type={'submit'} value={'注册'}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;