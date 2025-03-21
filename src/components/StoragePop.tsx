import React, {useEffect, useState} from 'react';
import {useAuth} from "../authentication/AuthContext.tsx";
import {useError} from "./ErrorContext.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface ProductModalProps {
    popTitle: string;
    isOpen: boolean;
    onClose: () => void;
    listChange: () => void;
    proId?: number;
    imageUrl?: string;
    setImageUrl?: (imageUrl: string) => void;
    title?: string;
    setTitle?: (title: string) => void;
    description?: string;
    setDescription?: (description: string) => void;
    price?: number;
    setPrice?: (price: number) => void;
    type?: number;
    setType?: (type: number) => void;
}

interface TypeInter {
    categoryId: number,
    name: string,
    description: string
}

const StoragePop: React.FC<ProductModalProps> = ({popTitle, isOpen, onClose , listChange, proId, imageUrl = '', setImageUrl = ()=>{console.log('StoragePop参数set方法传输失败')},
                                                 title='', setTitle= ()=>{console.log('StoragePop参数set方法传输失败')},
                                                 description='',setDescription = ()=>{console.log('StoragePop参数set方法传输失败')},
                                                 price=0,setPrice = ()=>{console.log('StoragePop参数set方法传输失败')},
                                                 type= 0,setType = ()=>{console.log('StoragePop参数set方法传输失败')}}) => {
    const loginState = useAuth();
    const { showError } = useError();


    // TODO 图片上传存储逻辑

    const handleSubmit = async () => {
        // Handle form submission logic
        const userId = loginState.state.user?.userId;
        if (!userId){
            showError("登录用户id获取失败");
            return;
        }
        // 构建请求体
        const requestBody = {
            productId: proId,
            seller: { userId },
            title,
            description,
            price,
            category: {categoryId : type},
            status: '在售',
        };

        //构建请求  添加商品/更新商品
        const response = await fetch(apiUrl+'/api/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        });

        if (response.ok){
            const {title, price} = await response.json();
            console.log(title +" ￥"+ price + "操作成功");
        }else {
            console.log("商品变动失败");
        }

        setImageUrl("");
        setTitle("");
        setDescription("");
        setPrice(0);
        setType(0);
        listChange();
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const [typeList,setTypeList] = useState<TypeInter[]>([]);
    // 获取类型列表
    const getProductsTypes = async () => {
        try {
            const response = await fetch(apiUrl+'/api/categories', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            if (!response.ok) {
                showError("后端/api/categories GET访问出错，请联系管理员");
                return;
            }
            const types = await response.json();
            setTypeList(types);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    useEffect(() => {
        getProductsTypes().then();
    }, []);

    return (
        // 黑色半透明幕布弹窗，仅自身触发onClick
        <div className="pop-win" onClick={(event) => event.currentTarget === event.target? onClose() : undefined}>
            <div className="pop-content">
                {/*关闭按钮 (废弃)*/}
                {/*<span className="close" onClick={onClose}>&times;</span>*/}
                <h4>{popTitle}</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit().then(); }}>
                    <table className="testTable">
                        <tbody>
                        <tr>
                            <td rowSpan={4}>
                                <label>Image:</label>
                                <input type="file" className={'form-control'} accept="image/*" />
                                {imageUrl && <img src={imageUrl} alt="Preview" width="100" />}
                            </td>
                            <td>标题：</td>
                            <td><input type="text" className={'form-control'} value={title} onChange={(e) => setTitle(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>介绍</td>
                            <td><textarea value={description} className={'form-control'} onChange={(e) => setDescription(e.target.value)}></textarea></td>
                        </tr>
                        <tr>
                            <td>价格</td>
                            <td><input type="number" className={'form-control'} value={price} onChange={(e) => setPrice(Number(e.target.value))}/></td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>
                                <select value={type} className={'form-control'} onChange={(e) => setType(Number(e.target.value))}>
                                    <option value={0} disabled>请选择</option>
                                    {typeList.map((item, index) => (
                                        <option key={index} value={item.categoryId}>{item.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <a onClick={onClose} className={"btn btn-gold"}>取消</a>
                        <input type="submit" className={"btn btn-gold"} value={"确定"}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoragePop;
