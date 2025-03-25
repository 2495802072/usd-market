import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './CSStheme/Theme001.css';
import './App.css';

import Home from "./views/Home.tsx";
import About from "./views/About.tsx";
import NotFound from "./views/NotFound.tsx";
import Navs from "./components/Navs.tsx";
import User from "./views/User.tsx";
import Likes from "./views/Likes.tsx";
import OrderList from "./views/OrderList.tsx";
import Message from "./views/Message.tsx";
import Storage from "./views/Storage.tsx";
import Login from "./views/Login2.tsx";
import {useEffect} from "react";
import {useAuth} from "./authentication/AuthContext.tsx";
import Cookies from "js-cookie";
import TypeManager from "./views/TypeManager.tsx";
import UserManager from "./views/UserManager.tsx";
import ProductDetail from "./components/ProductDetail.jsx.tsx";
import UserDetail from "./views/UserDetail.jsx.tsx";

const App = () => {
    const { dispatch } = useAuth();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // 当刷新网页时自动获取的token，复原登录状态
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            fetch(apiUrl+'/api/users/'+storedToken, {
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
                        <Route path="/shoppingTrolley" element={<Likes/>}/>
                        <Route path="/orderList" element={<OrderList/>}/>
                        <Route path="/message" element={<Message/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/type" element={<TypeManager/>}/>
                        <Route path="/usermanager" element={<UserManager/>}/>
                        <Route path="/products/:productId" element={<ProductDetail />} />
                        <Route path="/users/:userId" element={<UserDetail />} />

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
