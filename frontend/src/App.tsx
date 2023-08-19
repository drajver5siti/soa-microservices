import React from "react";
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
import AuthProvider from "./contexts/user";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DefaultFallback } from "./components/DefaultFallback";

const queryClient = new QueryClient();

function App() {
    return (
        <ErrorBoundary fallback={<DefaultFallback />}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AuthProvider>
                        <Navbar />
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            <Route path="*" element={<div>NOT FOUND</div>} />
                        </Routes>
                    </AuthProvider>
                </Router>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default App
