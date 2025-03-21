import './css/About.css';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

function About() {
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1 style={{ color: 'var(--shop-font-color)' }}>Vite + React</h1>
            <hr />
            <h5>
                <label style={{ fontWeight: "bold" }}>Author: </label>
                <a className={"authorA"} href="https://github.com/2495802072" target="_blank" rel="noopener noreferrer">
                    秦彦悦(笔名：顾霖轩)
                </a>
            </h5>
            <p>这是一个基于 Vite + React 的二手交易平台项目，旨在为用户提供一个便捷的二手商品交易体验。</p>
        </>
    );
}

export default About;
