import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../authentication/AuthContext.tsx';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {dispatch} = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();

        // 登录API TODO 前后端首次链接，尚待测试
        const response = await fetch('http://localhost:8080/api/users/login', {
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
        <div>
            <h2>登录</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>用户名:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>密码:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <input className={'btn btn-gold'} type={'submit'} value={'登录'} />
            </form>
        </div>
    );
};

export default Login;