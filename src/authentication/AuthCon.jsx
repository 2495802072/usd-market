import React, { createContext, useReducer, useContext } from 'react';

// 定义初始状态
const initialState = {
    isAuthenticated: false,
    user: null
};

// 定义reducer
const authReducer = (state, action) => {
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
const AuthContext = createContext();

// 创建提供者组件
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// 创建自定义钩子来使用上下文
export const useAuth = () => {
    return useContext(AuthContext);
};
