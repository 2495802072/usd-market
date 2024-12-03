import './css/About.css'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

function About(){
    return(
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1 style={{color: 'var(--shop-font-color)'}}>Vite + React</h1>
        </>
    )
}

export default About;