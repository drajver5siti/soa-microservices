import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./components/Home";
import Login from "./components/Login";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import Profile from "./components/Profile";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="*" element={<div>NOT FOUND</div>}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
