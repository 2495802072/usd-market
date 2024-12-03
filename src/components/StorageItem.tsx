import React from "react";
import './css/StorageItem.css'

const StorageItem:React.FC = () => {
    return (
        <div className={'storageItem'}>
            <div>
                <img className={'img3'} src="" alt="预览图"/>
                <div className={'d-block'} style={{textAlign: 'left',marginLeft: '1rem'}}>
                    <h3>商品名称</h3>
                    <p>商品简介</p>
                </div>
            </div>
            <div style={{alignItems: 'center',justifyContent: 'center'}}>
                <label style={{color: 'red', marginRight: '1rem'}}>￥0.00</label>
                <a className={'btn btn-gold'}>编辑</a>&nbsp;
                <a className={'btn btn-gold'}>已售出</a>
            </div>
        </div>
    )
}

export default StorageItem;