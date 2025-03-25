import "./css/TrolleyItem.css"
import React from "react";
import {useNavigate} from "react-router-dom";

interface TrolleyItemProps {
    key: number,
    imageUrl?: string,
    title?: string,
    info?: string,
    price?: number,
    productId: number
}

const LikedItems: React.FC<TrolleyItemProps>  = ({imageUrl = "",title="未命名",info = "缺少简介",price=0 , productId}) => {
    const navigate = useNavigate();

    function toDetail() {
        navigate('/products/'+ productId);
    }

    return (
        <>
            <div className="Trolley-Item">
                <div className="form-check">
                    <div className="flex-wrap" style={{width:'40px'}}>
                        <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>
                    </div>
                    <div className="form-check-item">
                        {imageUrl ?
                            <img style={{maxHeight: "80px", maxWidth: "80px"}} className={'img3'} src={imageUrl}
                                 alt="预览图"/>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-brand-airtable">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 10v8l7 -3v-2.6z"/>
                                <path d="M3 6l9 3l9 -3l-9 -3z"/>
                                <path d="M14 12.3v8.7l7 -3v-8z"/>
                            </svg>
                        }
                        <div className={'d-block item-info'} style={{textAlign: 'left', marginLeft: '1rem', cursor: 'pointer'}} onClick={toDetail}>
                            <h3>{title}</h3>
                            <p>{info}</p>
                        </div>
                    </div>
                    <div style={{alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{flex: 2}}></div>
                        <label style={{color: 'red', marginRight: '1rem'}}>￥{price.toFixed(2)}</label>
                        <a className={'btn btn-gold truncate text-truncate'}>联系商家</a>&nbsp;
                        <a className={'btn btn-gold truncate text-truncate'}>删除</a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LikedItems;
