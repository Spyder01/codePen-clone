import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import Select from 'react-select';
import useLocalStorage from '../hooks/useLocalStorage'


const Gif = (bool)=> {

  const gifs = [
    "M8o1MOwcwsWOmueqN4",
    "h3QZAnmQ6bHMI",
    "UsHgX0Ze5NBxlTORSr",
    "3ohuAepsZINiMLU3Ek",
    "14udF3WUwwGMaA",
    "iwVHUKnyvZKEg",
    "wO4cyxpDbtHji",
    "f8fir5ylD8fY4KX5NN",
    "spHCUbRqG4cjS",
    "VInghBdi0Ym9XJghC0"

]
if(bool)
return gifs[Math.floor(Math.random()*gifs.length)]
else return gifs[0]

}


const Displayer = (display)=>{
  if(display) return "flex"
  else return "none"
}

const App = ()=> {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [xml, setXml] = useState(true)
  const [Css, setCssT] = useState(true)
  const [Js, setJsT] = useState(true)
  const [gif, setGif] = useState(false)
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <nav className='navbar'>
        <div class='title' onClick={()=>setGif(gif=>!gif)}>
          SpyCode
        </div>
        <div className='selected'>
          <label value='xml' for='xml'>
            HTML
         <input name='xml' type='checkbox' checked={xml} onChange={()=>{
           return setXml(xml=>!xml)
         }}/>
         </label>
         <label value='CSS' >
            CSS
         <input name='css' type='checkbox' checked={Css} onChange={()=>{
           return setCssT(Css=>!Css)
         }}/>
         </label>
         <label value='js'>
            JS
         <input name='js' type='checkbox' checked={Js} onChange={()=>{
           return setJsT(Jss=>!Jss)
         }}/>
         </label>
        </div>
      </nav>
      
      <div className="pane top-pane">
      <div className='giphy' style={{display:Displayer(gif)}} ><iframe src={`https://giphy.com/embed/${Gif(gif)}`} frameBorder="0" class="giphy" allowFullScreen></iframe></div>
      <div className='editor' style={{display:Displayer(!gif)}}>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          display={xml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          display={Css}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          display={Js}
        />
        </div>

      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}




export default App;
