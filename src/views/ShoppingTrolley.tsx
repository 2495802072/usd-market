import './css/ShoppingTrolley.css'

function NotFound(){
    return (
        <div id={"TrolleyRoot"} className={"d-flex flex-column"}>
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
            <div id={"OrderBox"} className={"fixed-bottom"}>
                <table className={"w-100"}>
                    <tbody>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    总计：
                                </label>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NotFound;