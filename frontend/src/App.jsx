import Counter from "./counter"
import Login from "./page/Login/Login";
import MainPage from "./page/MainPage/MainPage"

import {BrowserRouter , Routes , Route} from 'react-router';
function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="/" element={<MainPage/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
