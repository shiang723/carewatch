import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AlertsPage from './pages/AlertsPage';
import AiPage from './pages/AiPage';

export default function App() {
    const [alerts, setAlerts] = useState([
        { id: 'ALT-101', patientId: 'A104', title: 'Critical SpO₂ & Heart Rate Elevation', message: 'SpO₂ dropped to 87% and Heart Rate elevated to 128 BPM simultaneously.', severity: 'HIGH', timestamp: '10 mins ago', status: 'Active' },
        { id: 'ALT-102', patientId: 'A105', title: 'High Fever & Tachycardia Detected', message: 'Temperature reached 38.6°C with sustained HR above 115 BPM.', severity: 'HIGH', timestamp: '25 mins ago', status: 'Active' },
        { id: 'ALT-103', patientId: 'A102', title: 'Elevated Heart Rate Warning', message: 'Heart Rate spike recorded at 108 BPM during routine monitoring.', severity: 'MEDIUM', timestamp: '1 hour ago', status: 'Active' },
        { id: 'ALT-104', patientId: 'A101', title: 'Sensor Re-calibration Required', message: 'Pulse oximeter sensor reported signal noise. Re-calibration recommended.', severity: 'LOW', timestamp: '2 hours ago', status: 'Acknowledged' },
        { id: 'ALT-105', patientId: 'A103', title: 'Mild Temperature Spike', message: 'Temperature reached 37.5°C. Returned to normal limits shortly after.', severity: 'LOW', timestamp: '4 hours ago', status: 'Resolved' }
    ]);

    const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;

    const handleAcknowledge = (id) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' } : a));
    };

    const handleResolve = (id) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
    };

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
                {/* Left Sidebar */}
                <Sidebar alertCount={activeAlertsCount} />

                {/* Right Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />

                    {/* Page Views */}
                    <main style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/patients" element={<PatientsPage />} />
                            <Route
                                path="/alerts"
                                element={
                                    <AlertsPage
                                        alerts={alerts}
                                        onAcknowledge={handleAcknowledge}
                                        onResolve={handleResolve}
                                    />
                                }
                            />
                            <Route path="/ai" element={<AiPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}