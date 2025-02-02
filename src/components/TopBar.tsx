import './css/TopBar.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../authentication/AuthContext.tsx";


const TopBar: React.FC = () =>{
    const loginState = useAuth();
    const navigate = useNavigate();
    const toLogin = () =>{
        navigate('/login');
    }
    const loginOut = () => {
        console.log(loginState.state.user?.username);
        console.log(loginState.state.isAuthenticated);
    }

    return (
        <>
            <div className="top-bar navbar fixed-top">
                <div>
                    <input type={'text'} placeholder={'/全局搜索...'}/>
                </div>
                <div className="dropdown" style={{width: '150px'}}>
                    <a className="dropdown-toggle" data-bs-toggle={loginState.state.isAuthenticated ? "dropdown" : null}
                       href={"#"} role="button" onClick={loginState.state.isAuthenticated ? null : toLogin}
                       aria-expanded="false">{loginState.state.user ? loginState.state.user.username : "未登录"}</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">用户设置</a></li>
                        <li><a className="dropdown-item" href="#">状态：在线</a></li>
                        <li><a className="dropdown-item" href="#">主题设置</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={loginOut}>退出登录</button>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default TopBar;