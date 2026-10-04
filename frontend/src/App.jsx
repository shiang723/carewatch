import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import AlertsPage from './pages/AlertsPage'
import AiPage from './pages/AiPage'

export default function App() {
    return (
        <Router>
            <div style={{display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc'}}>
                {/* Left Fixed Navigation Bar */}
                <Sidebar/>

                {/* Main Application Window */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    {/* Header Bar */}
                    <header style={{
                        height: '64px',
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 2rem'
                    }}>
                        <h1 style={{fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0}}>
                            Good morning, Sarah
                        </h1>

                        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                            <div style={{position: 'relative', cursor: 'pointer'}}>
                                <span style={{fontSize: '1.2rem'}}>🔔</span>
                                <span style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-6px',
                                    backgroundColor: '#ef4444',
                                    color: '#fff',
                                    borderRadius: '50%',
                                    fontSize: '0.65rem',
                                    padding: '2px 5px',
                                    fontWeight: 'bold'
                                }}>3</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}>
                                <span style={{
                                    backgroundColor: '#2563eb',
                                    color: '#fff',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '50%'
                                }}>S</span>
                                <span>Sarah ▾</span>
                            </div>
                        </div>
                    </header>

                    {/* Dynamic Page Routes */}
                    <main style={{flex: 1, backgroundColor: '#f8fafc'}}>
                        <Routes>
                            <Route path="/" element={<DashboardPage/>}/>
                            <Route path="/patients" element={<PatientsPage/>}/>
                            <Route path="/alerts" element={<AlertsPage/>}/>
                            <Route path="/ai" element={<AiPage/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    )
}