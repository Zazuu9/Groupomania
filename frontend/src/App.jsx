
import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import Dashboard from "./pages/Dashboard/Dashboard"
import Error404 from "./components/Error404/Error404"

function App() {
    return (
        <Routes>
            <Route path="/" exact element={<Navigate replace to ="/login"/>} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Signin />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="*" exact element={<Error404 />} />
        </Routes>
        )
}

export default App