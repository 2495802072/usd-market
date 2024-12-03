import './css/Home.css'
import React, {useRef, useState} from "react";
import bg from '../assets/img/南京理工大学泰州科技学院.jpg'
import ProductItem from "../components/ProductItem.tsx";

// 搜索历史,保留10个
const searchHistory : string[] = ["123","asd","asd","asd","asd","asd","asd","asd","asd","asd","asd","asd","asd"]


const SearchHistoryComponent: React.FC<{ history: string[], onSelect: (item: string) => void }> = ({ history, onSelect }) => {
    return (
        <div id='searchingHistory' className='text-truncate' style={{ backgroundColor: 'var(--shop-background-color)' }}>
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

const SearchBox: React.FC<{ searchingBoxRef: React.RefObject<HTMLInputElement> }> = ({ searchingBoxRef }) => (
    <div id='searching'>
        <div className={'image-container'} style={{ position: 'absolute', width: '150%',left: '-25%'}}>
            <img src={bg} alt={"背景"} />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </span>
            <input id={'searchingBox'} ref={searchingBoxRef} type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
            <button className="btn btn-gold" type="button">搜索</button>
        </div>
    </div>
);

const Classification: React.FC = () => (
    <div id={'classification'}>
        <table className={'w-100'}>
            <tbody>
                <tr><td>毕业促销</td><td>办公用品</td><td>娱乐产品</td><td>美妆护肤</td><td>体育健身</td></tr>
            </tbody>
        </table>
    </div>
)

function Home() {
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
            <SearchBox searchingBoxRef={searchingBoxRef} />
            <div id={'mainBox'}>
                {searchHistory.length > 0 && <SearchHistoryComponent history={searchHistory} onSelect={handleSelectHistoryItem} />}
                <br />
                {/*分类*/}
                <Classification />
                <br/>

                {/*商品列表*/}
                <div id={'productList'}>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                </div>
            </div>
        </>
    )
}

export default Home
