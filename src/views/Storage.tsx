import './css/Storage.css'
import StorageItem from "../components/StorageItem.tsx";
import TopBar from "../components/TopBar.tsx";
import StoragePop from "../components/StoragePop.tsx";
import {useState} from "react";

const titleLineStyle = {
    width: '100%',
    height: '45px',
    backgroundColor: 'var(--shop-background-color)',
    borderBottom: '1px solid var(--shop-border-color)',
    borderRadius: '10px 10px 0 0 ',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '20px',
}

const Storage = () =>{
    const [isPopOpen, setIsPopOpen] = useState<boolean>(false);

    const openPop = () => {
        setIsPopOpen(true);
    };

    const closePop = () => {
        setIsPopOpen(false);
    };


    return (
        <>
            <TopBar />
            <StoragePop isOpen={isPopOpen} onClose={closePop} />
            <div id={'storageBox'}>
                <div style={titleLineStyle}>
                    <label className={'m-2'}>我的货架</label>
                    <hr style={{flex: 2}}/>
                    <a className={'btn btn-gold'} style={{fontSize: '20px',borderRight:"none",borderBottom:"none",borderTop:"none",borderRadius: '0 9px 0 0'}}
                        onClick={openPop} >
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-home">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="2" y="2" width="16" height="16" fill="var(--shop-storage-bg)" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 6 L10 14 M6 10 L14 10" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"/>
                        </svg>
                        添加商品
                    </a>
                </div>
                {/*轶闻趣事： 我不小心组件名少写了Item，导致该页面引用自身，让网页该page卡机了 (((φ(◎ロ◎;)φ)))*/}
                <StorageItem imageUrl={""} name={"未命名"} info={"缺少简介"} price={0}/>
                <StorageItem />
            </div>
        </>
    )
}

export default Storage;