import './css/Storage.css'
import StorageItem from "../components/StorageItem.tsx";

function Storage(){
    return (
        <div id={'storageBox'}>
            <h1>Storage Page</h1>
            <StorageItem />
            添加商品
        </div>
    )
}

export default Storage;