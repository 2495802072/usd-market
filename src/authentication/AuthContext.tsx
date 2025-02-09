//组件说明 - by 秦彦悦：
// 作用域内使用useAuth方法获取登录信息
// 先使用const {dispatch} = useAuth();
import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// 定义用户和认证状态的类型
interface User {
    userId: bigint;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

// 定义action的类型
type AuthAction =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };

// 定义初始状态
const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

// 定义reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

// 创建上下文
const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}>({
    state: initialState,
    dispatch: () => undefined
});

// 创建提供者组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// 创建自定义钩子来使用其中内容
export const useAuth = () => {
    return useContext(AuthContext);
};
