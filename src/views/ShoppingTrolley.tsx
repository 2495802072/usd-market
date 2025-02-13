import './css/ShoppingTrolley.css'
import TrolleyItem from "../components/TrolleyItem.tsx";
import TopBar from "../components/TopBar.tsx";
import React from "react";

function ShoppingTrolley(){
    return (
        <>
            <TopBar/>
            <div id={"TrolleyRoot"} className={"d-flex flex-column"}>
                <div className="list-box d-flex flex-column ">
                    <TrolleyItem />
                    <TrolleyItem />
                    <TrolleyItem />
                    <TrolleyItem />
                    <TrolleyItem />
                </div>
                {/*<div id={"OrderBox"} className={"fixed-bottom"}>*/}
                {/*    <table className={"w-100"}>*/}
                {/*        <tbody>*/}
                {/*        <tr>*/}
                {/*            <td>*/}
                {/*                <div className="form-check">*/}
                {/*                    <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>*/}
                {/*                    <label className="form-check-label" htmlFor="defaultCheck1">*/}
                {/*                        总计：*/}
                {/*                    </label>*/}
                {/*                </div>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default ShoppingTrolley;