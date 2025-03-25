import React, {useState} from "react";
import './css/ProductItem.css'
import Cookies from "js-cookie";
import {useError} from "./ErrorContext.tsx";
import {useNavigate} from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface IProductItem {
    key:number,
    data:{
        productId: number,
        seller: {
            userId: number,
            username: string,
            email: string,
            phone: string,
            role: null,
        },
        title: string,
        description: string,
        price: number,
        category:{
            name: string,
        },
        status: string,
        imageUrl: string,
        createdAt: string,
        updatedAt: string
    },
    liked: boolean
}



const ProductItem: React.FC<IProductItem> = ({data,liked}) => {
    const [isLiked, setIsLiked] = useState(liked);
    const [userId] = useState<string | undefined>(Cookies.get("token"));
    const {showError} = useError();
    const navigate = useNavigate();

    // 构建请求体
    const requestBody = {
        product:{ productId: data.productId },
        buyer: { userId },
    };

    const addLikedItem = async () => {
        try {
            const response = await fetch(apiUrl+'/api/likes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody)
            });
            //出错显示错误信息
            if(!response.ok){
                showError(await response.text());
                return false;
            }

            return true;
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const removeLikedItem = async () => {
        try {
            const response = await fetch(apiUrl+'/api/likes', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody)
            });
            //出错显示错误信息
            if(!response.ok){
                showError(await response.text());
                return false;
            }
            return true;
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const addContacts = async () =>{
        try {
            const response = await fetch(apiUrl+'/api/contact',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: {userId: userId},
                    recipient: {userId: data.seller.userId}
                })
            })
            //出错显示错误信息
            if(!response.ok){
                showError(await response.text());
            }
            navigate('/message');

        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const addTransaction = async () =>{
        try {
            const response = await fetch(apiUrl+'/api/transaction',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    product: {
                        productId: data.productId
                    },
                    buyer: {
                        userId: userId
                    },
                    //TODO 完善订单信息填报
                    status: "送达",
                    address: "暂无",
                    note: "无备注"
                })
            })
            //出错显示错误信息
            if(!response.ok){
                showError(await response.text());
            }
            navigate('/message');

        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const changeIsLiked = () => {
        //删除收藏
        if(isLiked){
            console.log("删除");
            removeLikedItem().then((flag) => {
                if(!flag){
                    return;
                }
                setIsLiked(!isLiked);
            })
        }
        //添加收藏
        else{
            console.log("添加收藏");
            addLikedItem().then((flag) => {
                if(!flag){
                    return;
                }
                setIsLiked(!isLiked);
            })
        }

    }

    console.log(data.productId,isLiked);


    function toDetail() {
        navigate('/products/'+ data.productId);
    }

    return (
        <div className={'productItem'}>
            <div>
                {data.imageUrl ?
                    <img style={{maxHeight:"80px",maxWidth: "80px"}} className={'img3'} src={data.imageUrl} alt="预览图"/>
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
                <div className={'d-block'} style={{textAlign: 'left', marginLeft: '1rem', cursor: "pointer"}} onClick={toDetail}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
            <div style={{alignItems: 'center'}}>
                <img className={'img5'} src="" alt="头像"/>
                种草人数
                <div style={{flex: 2}}/>
                <label style={{color: 'red', marginRight: '1rem'}}>￥{data.price?.toFixed(2)}</label>
                <button className={"btn btn-gold"} onClick={changeIsLiked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill={isLiked ? "currentColor" : "none"}
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-heart">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                    </svg>
                </button>
                <a className={'btn btn-gold'} onClick={addContacts}>联系商家</a>
                <a className={'btn btn-gold'} onClick={addTransaction}>立即购买</a>
            </div>
        </div>
    )
}

export default ProductItem;
