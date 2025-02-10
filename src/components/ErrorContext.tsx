//组件说明 - by 秦彦悦：
// 作用域内使用useError('报错信息')，
// 一般使用const {showError} = useError 先重命名映射,防止方法冲突
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import './css/ErrorContext.css';

interface ErrorContextType {
    showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};

interface ErrorProviderProps {
    children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [error, setError] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const showError = (message: string) => {
        setError(message);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2500); // 动画时间 500ms + 显示时间 2000ms
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {visible && <ErrorPopup message={error} />}
        </ErrorContext.Provider>
    );
};

interface ErrorPopupProps {
    message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {
    const [animationClass, setAnimationClass] = useState<string>('popup-enter');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('popup-exit');
        }, 2000); // 显示2秒后开始退出动画
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={popupStyle} className={animationClass}>
            <div style={popupContentStyle}>
                <p>{message}</p>
            </div>
        </div>
    );
};

const popupStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1002,
};

const popupContentStyle: React.CSSProperties = {
    backgroundColor: 'var(--shop-background-color)',
    color: 'var(--shop-font-color)',
    border: '2px solid var(--shop-border-color)',
    fontWeight: 'bold',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
};