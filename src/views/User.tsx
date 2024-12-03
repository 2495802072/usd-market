import './css/User.css'

function User(){
    return (
        <div id="userRoot">
            <div id={'box1'} className={'d-flex align-items-center'}>
                <img src="" alt="用户头像" width={'100px'} height={'100px'} />
                <h2>User ID</h2>
                <div style={{flex: 2}}/>
                <p>编辑资料&gt;</p>
            </div>
            <br/>
            <br/>
            <div id={'box2'} className={'d-flex align-items-center'}>
                <table className={'w-100'}>
                    <tbody>
                    <tr>
                        <td><a href="#">收货地址</a></td>
                        <td><a href="#">修改密码</a></td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>退出登录</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User;