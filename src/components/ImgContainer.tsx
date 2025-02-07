import React from "react";

interface ImgContainerProps {
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0", // 你可以根据需要修改背景颜色
    overflow: "hidden" // 确保图片不会溢出容器
};

const imageStyle = (x: number, y: number): React.CSSProperties => ({
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    animation: "float 2s ease-in-out infinite, resize 2s ease-in-out infinite"
});

const ImgContainer: React.FC<ImgContainerProps> = ({ imageUrl, x, y, width, height }) => {
    return (
        <div style={containerStyle}>
            <img src={imageUrl} alt="placed-img" width={width} height={height} style={imageStyle(x, y)} />
            <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes resize {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
        </div>
    );
};

export default ImgContainer;
