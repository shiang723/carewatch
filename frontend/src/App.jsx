import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AlertsPage from './pages/AlertsPage';
import AiPage from './pages/AiPage';
import { acknowledgeAlert, getAlerts } from './services/alertService';
import { getPatientStatus, getPatients } from './services/patientService';

export default function App() {
    const [alerts, setAlerts] = useState([]);
    const [patients, setPatients] = useState([]);
    const [alertsError, setAlertsError] = useState('');

    useEffect(() => {
        Promise.all([getAlerts(), getPatients()])
            .then(([storedAlerts, patientData]) => {
                setAlerts(storedAlerts.map((alert) => ({
                id: alert.id,
                patientId: alert.patientID,
                title: `${alert.severity} patient alert`,
                message: alert.description,
                severity: alert.severity,
                timestamp: new Date(alert.timestamp).toLocaleString(),
                status: alert.acknowledged ? 'Acknowledged' : 'Active',
                })));
                return Promise.all(patientData.map(async (patient) => ({
                    ...patient,
                    status: await getPatientStatus(patient.patientId),
                })));
            })
            .then(setPatients)
            .catch((error) => setAlertsError(error.message));
    }, []);

    const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;

    const handleAcknowledge = async (id) => {
        try {
            await acknowledgeAlert(id);
            setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' } : a));
        } catch (error) {
            setAlertsError(error.message);
        }
    };

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
                {/* Left Sidebar */}
                <Sidebar alertCount={activeAlertsCount} />

                {/* Right Content Area */}
                <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <Header />

                    {/* Page Views */}
                    <main style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
                        <Routes>
                            <Route path="/" element={<DashboardPage alerts={alerts} patients={patients} />} />
                            <Route path="/patients" element={<PatientsPage patients={patients} />} />
                            <Route
                                path="/alerts"
                                element={
                                    <AlertsPage
                                        alerts={alerts}
                                        onAcknowledge={handleAcknowledge}
                                        error={alertsError}
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