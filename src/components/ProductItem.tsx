import React from "react";
import './css/ProductItem.css'

const ProductItem:React.FC = () => {
    return (
        <div className={'productItem'}>
            <div>
                <img className={'img3'} src="" alt="预览图"/>
                <div className={'d-block'} style={{textAlign: 'left',marginLeft: '1rem'}}>
                    <h3>商品名称</h3>
                    <p>商品简介</p>
                </div>
            </div>
            <div style={{alignItems: 'center'}}>
                <img className={'img5'} src="" alt="头像"/>
                种草人数
                <div style={{flex: 2}}/>
                <label style={{color: 'red',marginRight: '1rem'}}>￥0.00</label>
                <a className={'btn btn-gold'}>联系商家</a>
            </div>
        </div>
    )
}

export default ProductItem;