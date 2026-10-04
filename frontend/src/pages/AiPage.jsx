import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
    getPatients,
    getPatientStatus,
    explainPatient
} from '../services/patientService'

export default function AiPage() {
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState('')
    const [patientStatus, setPatientStatus] = useState(null)
    const [explanation, setExplanation] = useState('')

    useEffect(() => {
        getPatients()
            .then(setPatients)
            .catch((error) => console.error(error))
    }, [])

    const getPriorityStyle = (priority) => {
        if (priority === 'HIGH') {
            return {
                backgroundColor: '#fee2e2',
                color: '#dc2626'
            }
        }

        if (priority === 'MONITOR') {
            return {
                backgroundColor: '#fef3c7',
                color: '#d97706'
            }
        }

        return {
            backgroundColor: '#dcfce7',
            color: '#16a34a'
        }
    }

    const getVitalCardStyle = (priority) => {
        if (priority === 'HIGH') {
            return {
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca'
            }
        }

        if (priority === 'MONITOR') {
            return {
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a'
            }
        }

        return {
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0'
        }
    }

    return (
        <div
            style={{
                padding: '2.5rem',
                maxWidth: '1000px'
            }}
        >
            <h2 style={{ marginBottom: '0.5rem' }}>
                🤖 Gemini Patient Insights
            </h2>

            <p
                style={{
                    color: '#64748b',
                    marginBottom: '2rem'
                }}
            >
                Get a clear explanation of why a patient was flagged based on
                their vital signs and trends.
            </p>

            {/* Patient selector */}
            <div style={{ marginBottom: '2rem' }}>
                <label
                    style={{
                        fontWeight: '600',
                        marginRight: '0.75rem'
                    }}
                >
                    Select a patient:
                </label>

                <select
                    value={selectedPatient}
                    onChange={async (event) => {
                        const patientId = event.target.value

                        setSelectedPatient(patientId)
                        setExplanation('')

                        if (!patientId) {
                            setPatientStatus(null)
                            return
                        }

                        try {
                            const status = await getPatientStatus(patientId)
                            setPatientStatus(status)
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                    style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '1rem'
                    }}
                >
                    <option value="">Choose a patient</option>

                    {patients.map((patient) => (
                        <option
                            key={patient.patientId}
                            value={patient.patientId}
                        >
                            {patient.patientId}
                        </option>
                    ))}
                </select>
            </div>

            {patientStatus && (
                <>
                    {/* Patient status card */}
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <h3 style={{ margin: 0 }}>
                                Patient {patientStatus.patientId}
                            </h3>

                            <span
                                style={{
                                    ...getPriorityStyle(
                                        patientStatus.priority
                                    ),
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '999px',
                                    fontWeight: '700',
                                    fontSize: '0.85rem'
                                }}
                            >
                                {patientStatus.priority}
                            </span>
                        </div>

                        {/* Vitals */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <div
                                style={{
                                    ...getVitalCardStyle(
                                        patientStatus.priority
                                    ),
                                    padding: '1rem',
                                    borderRadius: '8px'
                                }}
                            >
                                <div
                                    style={{
                                        color: '#64748b',
                                        fontSize: '0.85rem',
                                        marginBottom: '0.35rem'
                                    }}
                                >
                                    Heart Rate
                                </div>

                                <strong style={{ fontSize: '1.2rem' }}>
                                    {patientStatus.currentHeartRate} BPM
                                </strong>
                            </div>

                            <div
                                style={{
                                    ...getVitalCardStyle(
                                        patientStatus.priority
                                    ),
                                    padding: '1rem',
                                    borderRadius: '8px'
                                }}
                            >
                                <div
                                    style={{
                                        color: '#64748b',
                                        fontSize: '0.85rem',
                                        marginBottom: '0.35rem'
                                    }}
                                >
                                    SpO₂
                                </div>

                                <strong style={{ fontSize: '1.2rem' }}>
                                    {patientStatus.currentSpO2}%
                                </strong>
                            </div>

                            <div
                                style={{
                                    ...getVitalCardStyle(
                                        patientStatus.priority
                                    ),
                                    padding: '1rem',
                                    borderRadius: '8px'
                                }}
                            >
                                <div
                                    style={{
                                        color: '#64748b',
                                        fontSize: '0.85rem',
                                        marginBottom: '0.35rem'
                                    }}
                                >
                                    Temperature
                                </div>

                                <strong style={{ fontSize: '1.2rem' }}>
                                    {patientStatus.currentTemperature}°C
                                </strong>
                            </div>
                        </div>

                        {/* Alert reasons */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <strong>Alert reasons</strong>

                            <ul
                                style={{
                                    marginTop: '0.5rem',
                                    paddingLeft: '1.25rem',
                                    lineHeight: '1.6'
                                }}
                            >
                                {patientStatus.reasons.map(
                                    (reason, index) => (
                                        <li key={index}>{reason}</li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Explain button */}
                        <button
                            onClick={async () => {
                                try {
                                    const result =
                                        await explainPatient(patientStatus)

                                    setExplanation(result.explanation)
                                } catch (error) {
                                    console.error(error)
                                }
                            }}
                            style={{
                                backgroundColor: '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '7px',
                                padding: '0.7rem 1.2rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            ✨ Explain Patient
                        </button>
                    </div>

                    {/* Gemini explanation */}
                    {explanation && (
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                boxShadow:
                                    '0 2px 6px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: '1rem'
                                }}
                            >
                                ✨ Gemini Explanation
                            </h3>

                            <div
                                style={{
                                    lineHeight: '1.7',
                                    color: '#334155'
                                }}
                            >
                                <ReactMarkdown>
                                    {explanation}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}