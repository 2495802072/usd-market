import React from 'react';

interface IconWithTextProps extends React.SVGProps<SVGSVGElement> {
    text: string; // 文本属性
    icon: React.ReactNode; // 图标属性，可以是 SVG 或其他 React 组件
}
const IconWithText: React.FC<IconWithTextProps> = ({ text, icon, ...props }) => (

    <div style={{overflow: 'hidden',width: '50%',display: 'flex',justifyContent: 'flex-start',transform: 'translateY(2px)'}}>
        <div {...props}>
            {icon}
        </div>
        <label style={text === ""?{display:"none"}:{marginLeft: '8px'}}>{text}</label>
    </div>

);

export default IconWithText;