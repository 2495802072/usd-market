import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './CSStheme/Theme001.css';
import './App.css';

import Home from "./views/Home.tsx";
import About from "./views/About.tsx";
import NotFound from "./views/NotFound.tsx";
import Navs from "./components/Navs.tsx";
import User from "./views/User.tsx";
import ShoppingTrolley from "./views/ShoppingTrolley.tsx";
import OrderList from "./views/OrderList.tsx";
import Message from "./views/Message.tsx";
import Storage from "./views/Storage.tsx";
import Login from "./views/Login2.tsx";
import {useEffect} from "react";
import {useAuth} from "./authentication/AuthContext.tsx";
import Cookies from "js-cookie";

const App = () => {
    const { dispatch } = useAuth();

    // 当刷新网页时自动获取的token，复原登录状态
    useEffect(() => {
        console.log("useEffect triggered");
        const storedToken = Cookies.get('token');
        console.log("Stored token:", storedToken);
        if (storedToken) {
            // 这里你可以调用一个API来获取用户信息并复原状态
            // 假设有一个API可以通过token获取用户信息
            fetch('http://47.121.115.160:8280/api/users/'+storedToken, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            }).then(response => response.json())
                .then(user => {
                    dispatch({
                        type: 'LOGIN',
                        payload: user
                    });
                    console.log("User logged in:", user);
                }).catch(error => {
                console.error('复原登录状态失败', error);
            });
        }
    }, []); // 空依赖数组，表示只在组件挂载时执行一次

    return (
        <>
            <Router>
                <Navs />
                <div className={'page'}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/storage" element={<Storage/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/shoppingTrolley" element={<ShoppingTrolley/>}/>
                        <Route path="/orderList" element={<OrderList/>}/>
                        <Route path="/message" element={<Message/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
