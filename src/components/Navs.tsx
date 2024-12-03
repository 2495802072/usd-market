import "./css/Navs.css"
import React,{ useState , useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import IconWithText from "./IconWithText.tsx";


const Navs: React.FC = () =>{
    //区别PC端和移动端(手机、平板)
    //useState 是一个用于在函数组件中添加状态的 Hook。它返回一个状态变量和一个函数来更新这个状态。
    // 与 Vue 中的响应式数据类似，React 的状态更新会触发组件的重新渲染。
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        setIsMobile(window.innerWidth < 993);
    }
    //useEffect 是一个用于在函数组件中执行副作用的 Hook。副作用可能包括数据获取、订阅和手动 DOM 操作等。
    // useEffect 会在组件渲染后执行。
    useEffect(() => {
        handleResize(); //初始化触发
        window.addEventListener('resize', handleResize); //窗口变化 => 触发

        return () => window.removeEventListener('resize', handleResize); // 清理监听

    },[]);//deps若存在，其改变时，才执行该函数

    const [isScroll, setIsScroll] = useState(false);

    return (
        <div>
            <nav className={isMobile ? "navbar fixed-bottom flex-nowrap" : "navbar fixed-left"} style={isScroll ? { width: "45px" } : {}}>
                {/*icon*/}
                <a href="#" className={"navbar-brand w-75"} style={isMobile|| isScroll ? {display: 'none'} : {margin: 0,color: 'var(--shop-a-color)',border: '4px double var(--shop-a-color)',textAlign: 'center'}}>物易站</a>
                {/*首页*/}
                <br/>
                <NavLink to="/" end className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "首页"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="26" height="26" viewBox="0 0 26 26" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-home">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                        </svg>}
                    />
                </NavLink>
                {/*我的货架*/}
                <NavLink to="/storage" className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "我的货架"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-category">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4h6v6h-6z"/>
                            <path d="M14 4h6v6h-6z"/>
                            <path d="M4 14h6v6h-6z"/>
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                        </svg>}
                    />
                </NavLink>

                {/*购物车*/}
                <NavLink to="/shoppingTrolley"
                         className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "购物车"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M17 17h-11v-14h-2"/>
                            <path d="M6 5l14 1l-1 7h-13"/>
                        </svg>}
                    />
                </NavLink>
                {/*订单s*/}
                <NavLink to="/orderList" className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "我的订单"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-checkup-list">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/>
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>
                            <path d="M9 14h.01"/>
                            <path d="M9 17h.01"/>
                            <path d="M12 16l1 1l3 -3"/>
                        </svg>}
                    />
                </NavLink>
                {/*消息*/}
                <NavLink to="/message" className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "消息"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-message">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 9h8"/>
                            <path d="M8 13h6"/>
                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"/>
                        </svg>}
                    />
                </NavLink>
                {/*用户*/}
                <NavLink to="/user" className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "用户中心"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg"
                                   width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                   className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                        </svg>}
                    />
                </NavLink>
                <div style={{flex: '2'}}></div>
                <NavLink to="/about" className={({isActive}) => (isActive ? 'active-link nav-link' : 'nav-link')}>
                    <IconWithText
                        text={isMobile || isScroll ? "" : "关于"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                   stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M 4.0097656 3 C 2.9179106 3 2.0097656 3.9049841 2.0097656 4.9980469 L 2 23 L 6 19 L 20 19 C 21.093063 19 22 18.093063 22 17 L 22 5 C 22 3.9069372 21.093063 3 20 3 L 4.0097656 3 z M 4.0097656 5 L 20 5 L 20 17 L 5.171875 17 L 4.0039062 18.167969 L 4.0097656 5 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 15 L 13 15 L 13 11 L 11 11 z"></path>
                        </svg>}
                    />
                </NavLink>
            </nav>
            <div style={isScroll ? {display: 'auto'} : {display: 'none'}}>
            </div>
        </div>

    );
}

export default Navs;