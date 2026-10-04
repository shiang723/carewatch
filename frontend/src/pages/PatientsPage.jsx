import { useEffect, useState } from 'react'
import { getPatients } from '../services/patientService'

export default function PatientsPage() {
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('priority')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getPatients()
            .then((data) => {
                setPatients(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Helper to determine clinical status & priority weight based on vitals
    const getPatientStatus = (vitals) => {
        const hr = vitals?.heartRate
        const spo2 = vitals?.spo2
        const temp = vitals?.temperature

        const isHrWarning = hr && (hr > 100 || hr < 60)
        const isSpo2Warning = spo2 && spo2 < 92
        const isTempWarning = temp && (temp > 38.0 || temp < 35.5)

        if (isHrWarning && isSpo2Warning) {
            return { label: 'HIGH', color: '#ef4444', bg: '#fef2f2', priority: 1, icon: '🔴' }
        }
        if (isHrWarning || isSpo2Warning || isTempWarning) {
            return { label: 'WATCH', color: '#f59e0b', bg: '#fffbeb', priority: 2, icon: '🟡' }
        }
        return { label: 'STABLE', color: '#10b981', bg: '#ecfdf5', priority: 3, icon: '🟢' }
    }

    // Filter and Sort Patients
    const processedPatients = patients
        .filter((p) => {
            const query = search.toLowerCase()
            const pId = (p.patientId || p.id || '').toString().toLowerCase()
            const name = (p.name || '').toLowerCase()
            const room = (p.room || p.roomNumber || '').toLowerCase()
            return name.includes(query) || pId.includes(query) || room.includes(query)
        })
        .sort((a, b) => {
            if (sortBy === 'priority') {
                const priorityA = getPatientStatus(a.currentVitals || a.vitals).priority
                const priorityB = getPatientStatus(b.currentVitals || b.vitals).priority
                return priorityA - priorityB
            }
            return (a.name || '').localeCompare(b.name || '')
        })

    if (loading) return <div style={{ padding: '2rem' }}>Loading patient data...</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600 }}>Patients</h2>
            <p style={{ color: '#64748b', marginTop: '0.25rem', marginBottom: '1.5rem' }}>Monitor current vital signs</p>

            {/* Search & Sort Header Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="🔍 Search patient..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.6rem 1rem',
                        fontSize: '0.95rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        outline: 'none'
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Sort:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem',
                            fontSize: '0.95rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            backgroundColor: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="priority">Priority ▾</option>
                        <option value="name">Name ▾</option>
                    </select>
                </div>
            </div>

            {/* Main Vitals Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <thead>
                <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.875rem' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Patient</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Heart Rate</th>
                    <th style={{ padding: '0.85rem 1rem' }}>SpO₂</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Temperature</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                </tr>
                </thead>
                <tbody>
                {processedPatients.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                            No matching patients found.
                        </td>
                    </tr>
                ) : (
                    processedPatients.map((p) => {
                        const vitals = p.currentVitals || p.vitals || {}
                        const status = getPatientStatus(vitals)
                        const pId = p.patientId || p.id

                        const hrWarning = vitals.heartRate && (vitals.heartRate > 100 || vitals.heartRate < 60)
                        const spo2Warning = vitals.spo2 && vitals.spo2 < 92
                        const tempWarning = vitals.temperature && (vitals.temperature > 38.0 || vitals.temperature < 35.5)

                        return (
                            <tr key={pId} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                                    <span style={{ marginRight: '0.5rem' }}>{status.icon}</span>
                                    {pId}
                                </td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                                    {vitals.heartRate ? `${vitals.heartRate} BPM` : '--'}
                                    {hrWarning && <span style={{ marginLeft: '0.3rem' }}>⚠️</span>}
                                </td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                                    {vitals.spo2 ? `${vitals.spo2}%` : '--'}
                                    {spo2Warning && <span style={{ marginLeft: '0.3rem' }}>⚠️</span>}
                                </td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                                    {vitals.temperature ? `${vitals.temperature}°C` : '--'}
                                    {tempWarning && <span style={{ marginLeft: '0.3rem' }}>⚠️</span>}
                                </td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: status.color,
                        backgroundColor: status.bg,
                        border: `1px solid ${status.color}33`
                    }}>
                      {status.label}
                    </span>
                                </td>
                            </tr>
                        )
                    })
                )}
                </tbody>
            </table>

            {/* Current Vitals Summary Cards */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Current Vitals Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {processedPatients.map((p) => {
                    const vitals = p.currentVitals || p.vitals || {}
                    const pId = p.patientId || p.id

                    return (
                        <div
                            key={pId}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                border: '1px solid #e2e8f0'
                            }}
                        >
                            <div style={{ fontWeight: 700, fontSize: '1.05rem', minWidth: '80px' }}>{pId}</div>
                            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
                                <div>❤️ {vitals.heartRate ? `${vitals.heartRate} BPM` : '--'}</div>
                                <div>💧 {vitals.spo2 ? `${vitals.spo2}%` : '--'}</div>
                                <div>🌡️ {vitals.temperature ? `${vitals.temperature}°C` : '--'}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}