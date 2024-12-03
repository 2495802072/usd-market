import './css/OrderList.css'

function NotFound(){
    return (
        <div id={"OrderRoot"} className={"d-flex flex-column"}>
            <div id={"OrderBox"} className={"fixed-top"}>
                <table className={"w-100"}>
                    <tbody>
                    <tr>
                        <td>日期</td>
                        <td>地区</td>
                        <td>金额</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="list-box d-flex flex-column ">
                <div className="form-check">
                    <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        checkbox
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        checkbox
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NotFound;