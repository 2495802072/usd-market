import React from "react";
import './css/StorageItem.css'

interface StorageItemProps {
    _key?: number,
    imageUrl?: string,
    title?: string,
    info?: string,
    price?: number,
    key?: number
}

// Eslint一直给key={index}的写法报错没有key参数, _key的作用就是绕过Eslint的检测（实在不想动Eslint）
const StorageItem: React.FC<StorageItemProps> = ({
                                                     imageUrl = "",
                                                     title = "未命名",
                                                     info = "缺少简介",
                                                     price = 0.00,
                                                     _key =-1
                                                 }) => {
    return (
        <div className={'storageItem'}>
            {/*不调用_key不允许build*/}
            <div style={{display: "none"}}>{_key}</div>
            <div>
                <img className={'img3'} src={imageUrl} alt="预览图"/>
                <div className={'d-block'} style={{textAlign: 'left', marginLeft: '1rem'}}>
                    <h3>{title}</h3>
                    <p>{info}</p>
                </div>
            </div>
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
                <a className={'btn btn-gold truncate text-truncate'}>编辑</a>
                <div style={{flex: 2}}></div>
                <label style={{color: 'red', marginRight: '1rem'}}>￥{price.toFixed(2)}</label>
                <a className={'btn btn-gold truncate text-truncate'}>下/上架</a>&nbsp;
                <a className={'btn btn-gold truncate text-truncate'}>已售出</a>
            </div>
        </div>
    )
}

export default StorageItem;