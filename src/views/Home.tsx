import './css/Home.css';
import React, {useEffect, useRef, useState} from "react";
import ProductItem from "../components/ProductItem.tsx";
import TopBar from "../components/TopBar.tsx";

// 搜索历史,保留10个
const searchHistory: string[] = ["123", "asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd"]


const SearchHistoryComponent: React.FC<{ history: string[], onSelect: (item: string) => void }> = ({history, onSelect}) => {
    return (
        <div id='searchingHistory' className='text-truncate' style={{backgroundColor: 'var(--shop-background-color)'}}>
            <table>
                <tbody>
                <tr>
                    <td>搜索历史：</td>
                    {history.map((item, index) => (
                        <td key={index}>
                            <a onClick={() => onSelect(item)} style={{cursor: 'pointer'}}>{item}</a>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

const SearchBox: React.FC<{ searchingBoxRef: React.RefObject<HTMLInputElement> }> = ({searchingBoxRef}) => (
    <div id='searching'>
        {/*<div className={'image-container'} style={{ position: 'absolute', width: '150%',left: '-25%'}}>*/}
        {/*    <img src={bg} alt={"背景"} />*/}
        {/*</div>*/}
        <div className="input-group mb-1">
            <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" stroke="#F79E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
                    <path d="M21 21l-6 -6"/>
                </svg>
            </span>
            <input id={'searchingBox'} ref={searchingBoxRef} type="text" className={"form-control"}
                   aria-label="Amount (to the nearest searching)"/>
            <button className="btn btn-gold" type="button">搜索</button>
        </div>
    </div>
);

const Classification: React.FC = () => (
    <div id={'classification'} >
        <table className={'w-100'}>
            <tbody className={'w-100'}>
            <tr className={'btn-group w-100'}>
                <td className={'btn btn-gold'}>毕业促销</td>
                <td className={'btn btn-gold'}>办公用品</td>
                <td className={'btn btn-gold'}>娱乐产品</td>
                <td className={'btn btn-gold'}>美妆护肤</td>
                <td className={'btn btn-gold'}>体育健身</td>
            </tr>
            </tbody>
        </table>
    </div>
)

const LittleCard: React.FC = () => {

    //判断是否是手机端，决定部分组件的显示与否
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

    }, []);//deps若存在，其改变时，才执行该函数

    return (
        <>
            <div className="vice-head-box-home flex-column" style={isMobile ? {display: 'none'} : {display: 'flex'}}>
                <a id="little-card" className="d-flex justify-content-start align-items-center">
                    <img src="" alt=""/>
                    <div className="d-flex flex-column justify-content-center">小名片</div>
                </a>
                <div className="d-flex justify-content-around btn-group">
                    <a className="btn btn-gold">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-message">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 9h8"/>
                            <path d="M8 13h6"/>
                            <path
                                d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"/>
                        </svg>
                        消息
                    </a>
                    <a className="btn btn-gold">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-checkup-list">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/>
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>
                            <path d="M9 14h.01"/>
                            <path d="M9 17h.01"/>
                            <path d="M12 16l1 1l3 -3"/>
                        </svg>
                        订单
                    </a>
                </div>
            </div>
        </>
    );
}

const Home: React.FC = () => {


    const searchingBoxRef = useRef<HTMLInputElement | null>(null);

    const handleSelectHistoryItem = (item: string) => {
        if (searchingBoxRef.current) {
            if ("value" in searchingBoxRef.current) {
                searchingBoxRef.current.value = item;
            }
        }
    };

    return (
        <>
            <TopBar/>
            <div className="head-box-home">
                <div className='searching-box-home'>
                    <SearchBox searchingBoxRef={searchingBoxRef}/>
                    {searchHistory.length > 0 &&
                        <SearchHistoryComponent history={searchHistory} onSelect={handleSelectHistoryItem}/>}
                </div>
                <LittleCard/>
            </div>

            <div id={'mainBox'}>
                <br/>
                {/*分类*/}
                <Classification/>
                <br/>

                {/*商品列表*/}
                <div id={'productList'}>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                </div>
            </div>
        </>
    )
}

export default Home
