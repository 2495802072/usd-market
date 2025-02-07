import React from "react";

interface ImgContainerProps {
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const containerStyle = (x: number , y:number): React.CSSProperties => ({
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    zIndex: 0,
    filter: "blur(10px)"
});

const imageStyle: React.CSSProperties = ({
    animation: "float 2s ease-in-out infinite, resize 2s ease-in-out infinite"
});

const ImgContainer: React.FC<ImgContainerProps> = ({ imageUrl, x, y, width, height }) => {
    return (
        <div style={containerStyle(x,y)}>
            <img src={imageUrl} alt="placed-img" width={width} height={height} style={imageStyle} />
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
