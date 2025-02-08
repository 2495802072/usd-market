import './css/Storage.css'
import StorageItem from "../components/StorageItem.tsx";
import TopBar from "../components/TopBar.tsx";

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
    return (
        <>
            <TopBar />
            <div id={'storageBox'}>
                <div style={titleLineStyle}>
                    <label className={'m-2'}>我的货架</label>
                    <hr style={{flex: 2}}/>
                    <a className={'btn btn-gold'} style={{fontSize: '20px',borderRight:"none",borderBottom:"none",borderTop:"none",borderRadius: '0 9px 0 0'}}>
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
                <StorageItem/>
                <StorageItem/>
                <StorageItem/>
                <StorageItem/>
                <StorageItem/>
                <p>添加商品</p>
            </div>
        </>
    )
}

export default Storage;