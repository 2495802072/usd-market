import './css/User.css'
import React, {FormEvent, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../authentication/AuthContext.tsx";
import {useError} from "../components/ErrorContext.tsx";

const User: React.FC = () => {
    const { showError } = useError();
    const navigate = useNavigate();
    const loginState = useAuth();
    const [openPassword, setOpenPassword] = React.useState(false);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [userId] = React.useState(Cookies.get('token'));
    const [username, setUsername] = React.useState(loginState.state.user?.username || '');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState(loginState.state.user?.email || '');
    const [phone, setPhone] = React.useState(loginState.state.user?.phone || '');
    const [universities, setUniversities] = useState<University[]>([]);
    const [majors, setMajors] = useState<Major[]>([]);
    const [selectedUniversity, setSelectedUniversity] = useState<number | null>(loginState.state.user?.university.universityId || null);
    const [selectedMajor, setSelectedMajor] = useState<number | null>(loginState.state.user?.major.majorId || null);

    interface University {
        universityId: number;
        universityName: string;
        location: string;
        establishedYear: number;
        website: string;
        majors: Major[];
    }

    interface Major {
        majorId: number;
        majorName: string;
        department: string;
        university: University;
    }

    const loginOut = () => {
        Cookies.remove('token');
        console.log("用户登出");
        navigate('/login');
    }

    // 加载大学数据
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/universities`);
                if (response.ok) {
                    const data = await response.json();
                    setUniversities(data);
                } else {
                    showError("加载大学数据失败");
                }
            } catch (error) {
                showError("网络错误，无法加载大学数据");
            }
        };

        fetchUniversities().then();
    }, [apiUrl, showError]);

    // 当选择的大学变化时，加载对应的专业
    useEffect(() => {

        if (selectedUniversity) {
            const fetchMajors = async () => {
                try {
                    const response = await fetch(`${apiUrl}/api/majors/university/${selectedUniversity}`);
                    if (response.ok) {
                        const data = await response.json();
                        setMajors(data);
                    } else {
                        showError("加载专业数据失败");
                    }
                } catch (error) {
                    showError("网络错误，无法加载专业数据");
                }
            };

            fetchMajors().then();
        } else {
            setMajors([]);
        }
    }, [selectedUniversity, apiUrl, showError]);

    useEffect(() => {

        console.log(loginState.state.user?.university)
        console.log(loginState.state.user?.username)

        if (loginState.state.user) {
            setUsername(loginState.state.user.username || '');
            setEmail(loginState.state.user.email || '');
            setPhone(loginState.state.user.phone || '');
            // 如果有大学和专业信息，也设置初始值
            // 这里假设后端返回的用户信息中包含universityId和majorId
            if (loginState.state.user.university.universityId) {
                setSelectedUniversity(loginState.state.user.university.universityId);
            }
            if (loginState.state.user.major.majorId) {
                setSelectedMajor(loginState.state.user.major.majorId);
            }
        }
    }, [loginState.state.user]);
    // loginState.state.user
    const turnOnPasswordBox = () => {
        setOpenPassword(true);
    }

    const changeUserInfo = async (event: FormEvent) => {
        event.preventDefault();
        //update用户信息请求体
        const response = await fetch(apiUrl+'/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                username,
                password,
                email,
                phone,
                university: {
                    universityId: selectedUniversity
                },
                major: {
                    majorId: selectedMajor
                }
            })
        });

        if (response.ok) {
            const {token, user} = await response.json();
            console.log("user : " + user);
            console.log("token : " + token);
            showError("修改成功");
        } else {
            //处理错误
            showError(await response.text());
        }
    }

    return (
        <div id="userRoot">
            <div className={"CardMain"}>
                <h1 className={'mt-5 mb-3'}>用户信息</h1>

                <form className={"w-100 mt-5"} action="">
                    <table className={"userInfoTable"}>
                        <tbody>
                        <tr>
                            <td></td>
                            <td><label className={"w-100"} style={{textAlign:"left"}}>NO.{userId}</label></td>
                        </tr>
                        <tr style={{borderTop:"1px solid var(--shop-border-color)"}}>
                            <td>
                                <div className={"w-100"} style={{position: "relative",height:"40px"}}>
                                    <img className={"imgBox"} src="" alt="" />
                                </div>
                            </td>
                            <td><input className={"form-control"} type="text" value={username} onChange={(e) =>{setUsername(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>密码</td>
                            <td>
                                {/*轶闻趣事：对于密码的处理上，因为密码加密过，本身无法还原显示，同样也导致，更新的时候，不小心对加密的密码进行了二次加密，导致莫名其妙的密码不正确，登陆失败*/}
                                {openPassword ?<input className={"form-control"} type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}}
                                                      onBlurCapture={(e)=> {
                                                          changeUserInfo(e).then(() => {
                                                              // 在 changeUserInfo 执行完之后，延迟2秒执行 loginOut
                                                              setTimeout(() => {
                                                                  loginOut();
                                                              }, 2000); // 2000 毫秒（2秒）的延迟
                                                          })
                                                      }}
                                    /> :
                                    <a className={"btn btn-golds"} onClick={turnOnPasswordBox}>修改密码</a>}
                            </td>
                        </tr>
                        <tr>
                            <td>邮箱</td>
                            <td><input className={"form-control"} type="text" value={email} onBlurCapture={changeUserInfo} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>手机号</td>
                            <td><input className={"form-control"} type="text" value={phone} onBlurCapture={changeUserInfo} onChange={(e) => {
                                setPhone(e.target.value)
                            }}/></td>
                        </tr>
                        <tr>
                            <td>大学</td>
                            <td>
                                <select
                                    className="form-control"
                                    value={selectedUniversity || ''}
                                    onChange={(e) => {
                                        const value = e.target.value ? parseInt(e.target.value) : null;
                                        setSelectedUniversity(value);
                                        setSelectedMajor(null); // 重置专业选择
                                    }}
                                >
                                    <option value="">请选择大学</option>
                                    {universities.map(university => (
                                        <option key={university.universityId} value={university.universityId}>
                                            {university.universityName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>专业</td>
                            <td>
                                <select
                                    className="form-control"
                                    value={selectedMajor || ''}
                                    onBlurCapture={changeUserInfo}
                                    onChange={(e) => {
                                        const value = e.target.value ? parseInt(e.target.value) : null;
                                        setSelectedMajor(value);
                                    }}
                                    disabled={!selectedUniversity}
                                >
                                    <option value="">请先选择大学</option>
                                    {majors.map(major => (
                                        <option key={major.majorId} value={major.majorId}>
                                            {major.majorName} ({major.department})
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <br/>
                            </td>
                        </tr>
                        <tr style={{borderTop:"1px solid var(--shop-border-color)",borderBottom:"1px solid var(--shop-border-color)"}}>
                            <td colSpan={2}><a href="" className={"btn btn-gold w-100"} onClick={loginOut}>退出登录</a></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default User;
