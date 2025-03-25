import './css/TopBar.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../authentication/AuthContext.tsx";
import Cookies from "js-cookie";

interface TopBarProp{
    text?: string;
}

const TopBar: React.FC<TopBarProp> = ({text}) =>{
    const loginState = useAuth();
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const toLogin = () =>{
        navigate('/login');
    }

    const [username, setUsername] = useState("");

    const loginOut = () => {
        Cookies.remove('token');
        console.log("用户登出");
        dispatch({
            type: 'LOGOUT'
        });
        //刷新页面
        // window.location.reload();
        toLogin();
    }

    useEffect(() => {
        setUsername( loginState.state.user ? loginState.state.user.username : "未登录")
    }, [loginState]);

    const goBack = () => {
        navigate(-1); // -1表示返回到上一个页面
    };

    return (
        <>
            <div className="top-bar navbar fixed-top">
                <a onClick={goBack} href={'#'} className={"btn btn-gold border-1"} style={{padding: "3px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11 7l-5 5l5 5"/>
                        <path d="M17 7l-5 5l5 5"/>
                    </svg>
                </a>
                <div style={{flex:"2"}}>
                    <label style={{fontWeight: "bold"}}>{text}</label>
                </div>
                <div>
                    <input type={'text'} placeholder={'/全局搜索...'}/>
                </div>
                <div className="dropdown" style={{width: '150px'}}>
                    <a className="dropdown-toggle" data-bs-toggle={loginState.state.isAuthenticated ? "dropdown" : null}
                       href={"#"} role="button" onClick={loginState.state.isAuthenticated ? () => {
                    } : toLogin}
                       aria-expanded="false">{username}</a>
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
