import React from "react";
import './css/StorageItem.css'

// TODO 开发结束后记得删除_key
interface StorageItemProps {
    _key?: number,
    proId: bigint,
    imageUrl?: string,
    title?: string,
    info?: string,
    price?: number,
    key?: number,
    type?: string,
    edit: (s_id: bigint,s_url: string,s_title: string,s_des: string,s_price: number,s_type: string) => void
}

// Eslint一直给key={index}的写法报错没有key参数, _key的作用就是绕过Eslint的检测（实在不想动Eslint）
const StorageItem: React.FC<StorageItemProps> = ({imageUrl = "", title = "未命名", info = "缺少简介", price = 0.00,type='请选择',
                                                     _key =-1,edit,proId
                                                 }) => {

    const parse_edit = () =>{
        edit(proId,imageUrl,title,info,price,type);
    }

    return (
        <div className={'storageItem'}>
            {/*不调用_key不允许build*/}
            <div style={{display: "none"}}>{_key}</div>
            <div>
                {imageUrl ?
                    <img style={{maxHeight:"80px",maxWidth: "80px"}} className={'img3'} src={imageUrl} alt="预览图"/>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-brand-airtable">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 10v8l7 -3v-2.6z"/>
                        <path d="M3 6l9 3l9 -3l-9 -3z"/>
                        <path d="M14 12.3v8.7l7 -3v-8z"/>
                    </svg>
                }
                <div className={'d-block'} style={{textAlign: 'left', marginLeft: '1rem'}}>
                    <h3>{title}</h3>
                    <p>{info}</p>
                </div>
            </div>
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
                <a className={'btn btn-gold truncate text-truncate'} onClick={parse_edit}>编辑</a>
                <div style={{flex: 2}}></div>
                <label style={{color: 'red', marginRight: '1rem'}}>￥{price.toFixed(2)}</label>
                <a className={'btn btn-gold truncate text-truncate'}>下/上架</a>&nbsp;
                <a className={'btn btn-gold truncate text-truncate'}>已售出</a>
            </div>
        </div>
    )
}

export default StorageItem;