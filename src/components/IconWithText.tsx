import React from 'react';

// 定义一个接口来描述组件的属性
interface IconWithTextProps {
    text: string; // 文本属性
    icon: React.ReactNode; // 图标属性，可以是 SVG 或其他 React 组件
    className?: string; // 可选的 className 属性
    style?: React.CSSProperties; // 可选的样式属性
}

const IconWithText: React.FC<IconWithTextProps> = ({ text, icon, className, style }) => (
    <div
        style={{
            overflow: 'hidden',
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',
            transform: 'translateY(2px)',
            ...style, // 合并传入的样式
        }}
        className={className} // 合并传入的 className
    >
        <div>
            {icon}
        </div>
        <label style={text === "" ? { display: "none" } : { marginLeft: '8px' }}>
            {text}
        </label>
    </div>
);

export default IconWithText;
