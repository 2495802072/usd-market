import './css/Login.css'
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../authentication/AuthContext.tsx';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {dispatch} = useAuth();

    const handleLogin = async (event) => {
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

    return (
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
                                <td>邮箱:</td>
                                <td><input
                                    type="text"
                                    value={email}
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
                        <input className={'btn btn-gold'} type={'submit'} value={'注册'}/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;