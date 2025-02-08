import React from "react";
import './css/StorageItem.css'

interface StorageItemProps {
    imageUrl?: string;
    name?: string;
    info?: string;
    price?: number;
}

const StorageItem:React.FC<StorageItemProps> = ({imageUrl = "",name = "未命名",info = "缺少简介",price = 0.00}) => {
    return (
        <div className={'storageItem'}>
            <div>
                <img className={'img3'} src={imageUrl} alt="预览图"/>
                <div className={'d-block'} style={{textAlign: 'left',marginLeft: '1rem'}}>
                    <h3>{name}</h3>
                    <p>{info}</p>
                </div>
            </div>
            <div style={{alignItems: 'center',justifyContent: 'center'}}>
                <a className={'btn btn-gold truncate text-truncate'}>编辑</a>
                <div style={{flex:2}}></div>
                <label style={{color: 'red', marginRight: '1rem'}}>￥{price.toFixed(2)}</label>
                <a className={'btn btn-gold truncate text-truncate'}>下/上架</a>&nbsp;
                <a className={'btn btn-gold truncate text-truncate'}>已售出</a>
            </div>
        </div>
    )
}

export default StorageItem;