import { Routes,Route } from "react-router"
import { UserContextProvider } from "./UserContext"
import Home from "./Home"
import Data from "./Data"
import Record from "./Record"


const App = () => {
  return (
   <UserContextProvider>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/student" element={<Data />} />
      <Route path="/data" element={ <Record/>} />
    </Routes>
   </UserContextProvider>
  )
}

export default App