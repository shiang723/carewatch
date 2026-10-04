import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, AlertTriangle, Heart, Droplets, ShieldAlert, Thermometer } from 'lucide-react';

function getHeartRatePriority(heartRate) {
    if (heartRate >= 60 && heartRate <= 100) return 'STABLE';
    if (heartRate > 120 || heartRate <= 40) return 'HIGH';
    return 'MONITOR';
}

function getSpo2Priority(spo2) {
    if (spo2 >= 95) return 'STABLE';
    if (spo2 >= 90) return 'MONITOR';
    return 'HIGH';
}

function getTemperaturePriority(temperature) {
    if (temperature >= 36 && temperature <= 37.5) return 'STABLE';
    if (temperature >= 38 || temperature < 35) return 'HIGH';
    return 'MONITOR';
}

export default function PatientsPage({ patients = [] }) {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('patientId') ?? '');
    const [sortBy, setSortBy] = useState('Priority');

    const patientRows = patients.map((patient) => {
        const vitals = patient.status || {};
        return {
            id: patient.patientId,
            hr: vitals.currentHeartRate,
            hrPriority: getHeartRatePriority(vitals.currentHeartRate),
            spo2: vitals.currentSpO2,
            spo2Priority: getSpo2Priority(vitals.currentSpO2),
            temp: `${vitals.currentTemperature}°C`,
            tempPriority: getTemperaturePriority(vitals.currentTemperature),
            status: vitals.priority,
            priorityScore: { HIGH: 1, MONITOR: 2, STABLE: 3 }[vitals.priority] ?? 4
        };
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'HIGH':
                return {
                    dotColor: '#ef4444',
                    badgeBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    badgeText: '#ffffff',
                    badgeShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                    cardGlow: '0 6px 24px -2px rgba(239, 68, 68, 0.15)'
                };
            case 'MONITOR':
                return {
                    dotColor: '#f59e0b',
                    badgeBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    badgeText: '#ffffff',
                    badgeShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                    cardGlow: '0 6px 24px -2px rgba(245, 158, 11, 0.12)'
                };
            case 'STABLE':
            default:
                return {
                    dotColor: '#10b981',
                    badgeBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    badgeText: '#ffffff',
                    badgeShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                    cardGlow: '0 6px 24px -2px rgba(16, 185, 129, 0.1)'
                };
        }
    };

    const filteredPatients = useMemo(() => {
        let result = patientRows.filter(p =>
            p.id.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

        if (sortBy === 'Priority') {
            result.sort((a, b) => a.priorityScore - b.priorityScore);
        } else if (sortBy === 'ID') {
            result.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortBy === 'Heart Rate') {
            result.sort((a, b) => b.hr - a.hr);
        }

        return result;
    }, [patientRows, searchQuery, sortBy]);

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            padding: '40px 20px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Centered Wrapper Container */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                {/* Header Section */}
                <div style={{ marginBottom: '32px', textAlign: 'left' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                        Patients
                    </h1>
                </div>

                {/* Centered Controls Bar */}
                <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '28px'
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search
                            size={22}
                            color="#3b82f6"
                            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search patient ID or status..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 18px 14px 52px',
                                borderRadius: '14px',
                                border: '2px solid #cbd5e1',
                                fontSize: '16px',
                                fontWeight: '600',
                                outline: 'none',
                                backgroundColor: '#ffffff',
                                color: '#0f172a',
                                boxSizing: 'border-box',
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
                            }}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                aria-label="Clear patient search"
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#64748b',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    lineHeight: 1,
                                    cursor: 'pointer',
                                    padding: '4px 8px'
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#475569' }}>Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '12px 20px',
                                borderRadius: '14px',
                                border: '2px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                fontSize: '15px',
                                fontWeight: '800',
                                color: '#0f172a',
                                outline: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            <option value="Priority">Priority Rank</option>
                            <option value="ID">Patient ID</option>
                            <option value="Heart Rate">Highest Heart Rate</option>
                        </select>
                    </div>
                </div>

                {/* Main Centered Table with Larger Rows and High Contrast Borders */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    border: '2px solid #cbd5e1',
                    boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                    marginBottom: '48px'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                        <tr style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                            <th style={{ padding: '22px 28px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', borderRight: '1px solid #334155', width: '20%' }}>Patient</th>
                            <th style={{ padding: '22px 28px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', borderRight: '1px solid #334155', width: '25%' }}>Heart Rate</th>
                            <th style={{ padding: '22px 28px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', borderRight: '1px solid #334155', width: '20%' }}>SpO₂ Level</th>
                            <th style={{ padding: '22px 28px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', borderRight: '1px solid #334155', width: '20%' }}>Temperature</th>
                            <th style={{ padding: '22px 28px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', width: '15%' }}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPatients.map((patient, index) => {
                            const style = getStatusStyle(patient.status);
                            const getVitalBadge = (priority) => priority === 'HIGH'
                                ? {
                                    background: '#fee2e2',
                                    border: '#fca5a5',
                                    color: '#b91c1c',
                                    iconColor: '#dc2626',
                                    label: 'HIGH'
                                }
                                : priority === 'MONITOR' ? {
                                    background: '#fef3c7',
                                    border: '#fde68a',
                                    color: '#b45309',
                                    iconColor: '#d97706',
                                    label: 'MONITOR'
                                } : null;

                            return (
                                <tr
                                    key={patient.id}
                                    style={{
                                        borderBottom: '2px solid #cbd5e1',
                                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                                    }}
                                >
                                    {/* Patient ID */}
                                    <td style={{ padding: '22px 28px', borderRight: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                backgroundColor: style.dotColor,
                                                boxShadow: `0 0 0 4px ${style.dotColor}33`
                                            }} />
                                            <span style={{ fontWeight: '900', fontSize: '18px', color: '#0f172a' }}>
                                                    {patient.id}
                                                </span>
                                        </div>
                                    </td>

                                    {/* Heart Rate */}
                                    <td style={{ padding: '22px 28px', borderRight: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{patient.hr} BPM</span>
                                            {getVitalBadge(patient.hrPriority) && (
                                                <div style={{ background: getVitalBadge(patient.hrPriority).background, padding: '5px 10px', borderRadius: '8px', border: `1px solid ${getVitalBadge(patient.hrPriority).border}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {patient.hrPriority === 'HIGH'
                                                        ? <ShieldAlert size={16} color={getVitalBadge(patient.hrPriority).iconColor} />
                                                        : <AlertTriangle size={16} color={getVitalBadge(patient.hrPriority).iconColor} />}
                                                    <span style={{ fontSize: '12px', fontWeight: '800', color: getVitalBadge(patient.hrPriority).color }}>{getVitalBadge(patient.hrPriority).label}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* SpO2 */}
                                    <td style={{ padding: '22px 28px', borderRight: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{patient.spo2}%</span>
                                            {getVitalBadge(patient.spo2Priority) && (
                                                <div style={{ background: getVitalBadge(patient.spo2Priority).background, padding: '5px 10px', borderRadius: '8px', border: `1px solid ${getVitalBadge(patient.spo2Priority).border}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {patient.spo2Priority === 'HIGH'
                                                        ? <ShieldAlert size={16} color={getVitalBadge(patient.spo2Priority).iconColor} />
                                                        : <AlertTriangle size={16} color={getVitalBadge(patient.spo2Priority).iconColor} />}
                                                    <span style={{ fontSize: '12px', fontWeight: '800', color: getVitalBadge(patient.spo2Priority).color }}>{getVitalBadge(patient.spo2Priority).label}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Temperature */}
                                    <td style={{ padding: '22px 28px', borderRight: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{patient.temp}</span>
                                            {getVitalBadge(patient.tempPriority) && (
                                                <div style={{ background: getVitalBadge(patient.tempPriority).background, padding: '5px 10px', borderRadius: '8px', border: `1px solid ${getVitalBadge(patient.tempPriority).border}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {patient.tempPriority === 'HIGH'
                                                        ? <ShieldAlert size={16} color={getVitalBadge(patient.tempPriority).iconColor} />
                                                        : <AlertTriangle size={16} color={getVitalBadge(patient.tempPriority).iconColor} />}
                                                    <span style={{ fontSize: '12px', fontWeight: '800', color: getVitalBadge(patient.tempPriority).color }}>{getVitalBadge(patient.tempPriority).label}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td style={{ padding: '22px 28px', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '8px 22px',
                                                borderRadius: '24px',
                                                fontSize: '13px',
                                                fontWeight: '900',
                                                letterSpacing: '0.06em',
                                                background: style.badgeBg,
                                                color: style.badgeText,
                                                boxShadow: style.badgeShadow
                                            }}>
                                                {patient.status}
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Current Vitals Summary Heading */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                        Current Vitals Summary
                    </h2>
                </div>

                {/* Larger Grid Summary Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '22px' }}>
                    {filteredPatients.map((patient) => {
                        const style = getStatusStyle(patient.status);

                        return (
                            <div key={patient.id} style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '18px',
                                border: '2px solid #cbd5e1',
                                padding: '24px 28px',
                                boxShadow: style.cardGlow,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: style.dotColor }} />
                                        <span style={{ fontWeight: '900', fontSize: '20px', color: '#0f172a' }}>
                                            Patient {patient.id}
                                        </span>
                                    </div>
                                    <span style={{
                                        padding: '6px 16px',
                                        borderRadius: '14px',
                                        fontSize: '12px',
                                        fontWeight: '900',
                                        background: style.badgeBg,
                                        color: '#ffffff',
                                        boxShadow: style.badgeShadow
                                    }}>
                                        {patient.status}
                                    </span>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '12px',
                                    padding: '16px',
                                    background: '#f8fafc',
                                    borderRadius: '14px',
                                    border: '1.5px solid #e2e8f0',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <Heart size={22} color="#ef4444" fill="#ef4444" />
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>HR</span>
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>{patient.hr}</span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <Droplets size={22} color="#3b82f6" fill="#3b82f6" />
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>SpO₂</span>
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>{patient.spo2}%</span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <Thermometer size={22} color="#ec4899" />
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>TEMP</span>
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>{patient.temp}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}