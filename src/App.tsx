// import { useState } from 'react'
import linkkilogo from '/logoBK.png'
import background from '/top-view.jpg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const divStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  };
  
  return (
    <>
      <div style = {divStyle}>
        <a href="https://github.com/eve-vp/linnkki-Movie-Challenge-React" target="_blank">
          <img src={linkkilogo} className="logo" alt="linnki logo" />
        </a>
        </div>
      <h2>“Welcome to our movie catalog"<br />
      Are you a fan of movies?
      </h2>
      <div className="card">
      <div className="container">
      <a className="btn" href="/Movies"><h1>let's go</h1></a>
      </div>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      <p className="read-the-docs">
      <h3>We have a special <br />
        selection for you! </h3>
      {/* Explore our catalog and discover your new favorite movies.” */}
      </p>
    </>
  )
}

export default App
