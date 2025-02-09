import React, { useState } from 'react';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StoragePop: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [type, setType] = useState<string>('请选择');

    // TODO 图片处理逻辑，大量bug
    // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const formData = new FormData();
    //         formData.append('file', event.target.files[0]);
    //
    //         try {
    //             const response = await axios.post('/upload', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //             setImageUrl(response.data.url);
    //         } catch (error) {
    //             console.error('Image upload failed:', error);
    //         }
    //     }
    // };

    const handleSubmit = () => {
        // Handle form submission logic
        console.log({ imageUrl, name, description, price });
        setImageUrl("");
        setName("");
        setDescription("");
        setPrice(0);
        setType('请选择');
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        // 黑色半透明幕布弹窗，仅自身触发onClick
        <div className="pop-win" onClick={(event) => event.currentTarget === event.target? onClose() : undefined}>
            <div className="pop-content">
                {/*关闭按钮 (废弃)*/}
                {/*<span className="close" onClick={onClose}>&times;</span>*/}
                <h4>Add Product</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <table className="testTable">
                        <tbody>
                        <tr>
                            <td rowSpan={4}>
                                <label>Image:</label>
                                <input type="file" className={'form-control'} accept="image/*" />
                                {imageUrl && <img src={imageUrl} alt="Preview" width="100" />}
                            </td>
                            <td>标题：</td>
                            <td><input type="text" className={'form-control'} value={name} onChange={(e) => setName(e.target.value)}/></td>
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
                                <select value={type} className={'form-control'} onChange={(e) => setType(e.target.value)}>
                                    <option value={'请选择'} disabled>请选择</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default StoragePop;
