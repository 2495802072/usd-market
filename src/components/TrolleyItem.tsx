import "./css/TrolleyItem.css"

const TrolleyItem = () => {
    return (
        <>
            <div className="Trolley-Item">
                <div className="form-check">
                    <input className="form-check-input m-1" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        checkbox
                    </label>
                </div>
            </div>
        </>
    )
};

export default TrolleyItem;