import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './CSStheme/systemLight.css'
import './App.css'

import Home from "./views/Home.tsx";
import About from "./views/About.tsx";
import NotFound from "./views/NotFound.tsx";
import Navs from "./components/Navs.tsx";
import User from "./views/User.tsx";
import ShoppingTrolley from "./views/ShoppingTrolley.tsx";
import OrderList from "./views/OrderList.tsx";
import Message from "./views/Message.tsx";
import Storage from "./views/Storage.tsx";
import Login from "./views/Login.tsx";

const App = () => {

    return (
        <Router>
            <Navs />

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
        </Router>
    );
}

export default App;
