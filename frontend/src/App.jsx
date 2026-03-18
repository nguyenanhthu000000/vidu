import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import History from "./pages/History";
import Login from "./pages/Login";

function App(){

  const user = localStorage.getItem("user");

  if(!user){
    return <Login/>
  }

  return(

    <BrowserRouter>

      <div style={{display:"flex"}}>

        <Sidebar/>

        <div style={{flex:1}}>

          <Routes>

            <Route path="/" element={<Chat/>}/>

            <Route path="/documents" element={<Documents/>}/>

            <Route path="/history" element={<History/>}/>

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  )

}

export default App