import './css/Storage.css'
import StorageItem from "../components/StorageItem.tsx";
import TopBar from "../components/TopBar.tsx";
import StoragePop from "../components/StoragePop.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useError} from "../components/ErrorContext.tsx";
import {useAuth} from "../authentication/AuthContext.tsx";

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

interface StorageItemType {
    productId: number;
    imgUrl: string;
    title: string;
    description: string;
    price: number;
    category: string;
}

const Storage = () =>{
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [isPopOpen, setIsPopOpen] = useState<boolean>(false);

    const [productId, setProductId] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [type, setType] = useState<number>(0);
    const [pTitle, setPTitle] = useState<string>('添加商品');

    const [storageList, setStorageList] = useState<StorageItemType[]>([]);
    const { showError } = useError();
    const loginState = useAuth();

    const openPop = () => {
        setPTitle("添加商品");
        setProductId(0);
        setIsPopOpen(true);
    };

    const setEdit = (s_id: number ,s_url: string,s_title: string,s_des: string,s_price: number,s_type: string) =>{
        setProductId(s_id);
        setPTitle("编辑商品");
        setImageUrl(s_url);
        setTitle(s_title);
        setDescription(s_des);
        setPrice(s_price);
        setType(s_type);
        setIsPopOpen(true);
    }

    const closePop = () => {
        setIsPopOpen(false);
    };

    const navigate = useNavigate();
    const toLogin = () =>{
        navigate('/login');
    }

    //获取后端用户商品数据
    const fetchProducts = async () => {
        try {
            const response = await fetch(apiUrl+'/api/products/bySeller', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId})
            });
            if (!response.ok) {
                showError("后端/api/products访问出错，请联系管理员");
            }
            const data = await response.json();
            // console.log("响应：");
            // console.log(data);
            setStorageList(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const userId = loginState.state.user?.userId;
    //userId变化更新storageList
    useEffect(() => {
        if(userId){
            console.log('userId ', userId);
            fetchProducts().then();
        }
    }, [userId]);

    useEffect(() => {
        console.log("当前商品列表", storageList);
    }, [storageList]); // 在 storageList 更新后打印

    return (
        <>
            <TopBar />
            <StoragePop popTitle={pTitle} isOpen={isPopOpen} onClose={closePop} listChange={fetchProducts} proId={productId} imageUrl={imageUrl} setImageUrl={setImageUrl}
            title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} type={type} setType={setType} />

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
                {/*轶闻趣事： 我不小心组件名少写了Item，导致该页面引用自身，让网页该page卡崩溃了 (((φ(◎ロ◎;)φ)))*/}
                {useAuth().state.isAuthenticated ?
                    <>
                        {storageList.map((item,index) => (
                            <StorageItem key={index} imageUrl={item.imgUrl} proId={item.productId} title={item.title} info={item.description} price={item.price} type={item.category} edit={setEdit} />
                        ))}
                    </>

                    :
                    <>
                    <label className={"w-50 m-2"} style={{fontSize: '20px', fontWeight: "bold",border: "1px solid var(--shop-border-color)"}}>
                        请先
                        <a className={"btn fw-bold"} onClick={toLogin}>登录↗</a>
                    </label>
                </>}
            </div>
        </>
    )
}

export default Storage;
