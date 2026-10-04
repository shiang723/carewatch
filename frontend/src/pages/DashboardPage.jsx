import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    ArrowRight,
    Clock,
    ShieldAlert,
    Activity,
    ChevronRight
} from 'lucide-react';

export default function DashboardPage({ alerts = [], patients = [] }) {
    const navigate = useNavigate();

    const statusCounts = patients.reduce((counts, patient) => {
        const priority = patient.status?.priority;
        if (priority === 'HIGH') counts.high += 1;
        if (priority === 'MONITOR') counts.monitor += 1;
        if (priority === 'STABLE') counts.stable += 1;
        return counts;
    }, { high: 0, monitor: 0, stable: 0 });

    const stats = [
        {
            label: 'Total Patients',
            value: patients.length,
            icon: Users,
            accentColor: '#3b82f6',
            gradientBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderColor: '#bfdbfe',
            glowColor: 'rgba(59, 130, 246, 0.15)'
        },
        {
            label: 'Stable',
            value: statusCounts.stable,
            dotColor: '#10b981',
            gradientBg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            borderColor: '#a7f3d0',
            glowColor: 'rgba(16, 185, 129, 0.2)'
        },
        {
            label: 'Monitor',
            value: statusCounts.monitor,
            dotColor: '#f59e0b',
            gradientBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            borderColor: '#fde68a',
            glowColor: 'rgba(245, 158, 11, 0.2)'
        },
        {
            label: 'Critical Alert',
            value: statusCounts.high,
            dotColor: '#ef4444',
            gradientBg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderColor: '#fca5a5',
            glowColor: 'rgba(239, 68, 68, 0.25)'
        },
    ];

    const severityOrder = {
        HIGH: 0,
        MONITOR: 1,
        STABLE: 2
    };

    const recentAlerts = [...alerts]
        .sort((a, b) => {
            const severityDifference =
                (severityOrder[a.severity] ?? Number.MAX_SAFE_INTEGER)
                - (severityOrder[b.severity] ?? Number.MAX_SAFE_INTEGER);

            return severityDifference || new Date(b.timestamp) - new Date(a.timestamp);
        })
        .slice(0, 3)
        .map((alert) => ({
            id: alert.id,
            patient: alert.patientId,
            type: alert.message,
            time: formatRelativeTime(alert.timestamp),
            priority: alert.severity
        }));

    const priorityPatients = patients
        .filter((patient) => patient.status?.priority !== 'STABLE')
        .sort((a, b) => severityOrder[a.status?.priority] - severityOrder[b.status?.priority])
        .slice(0, 2)
        .map((patient) => ({
            id: patient.patientId,
            hr: `${patient.status.currentHeartRate} BPM`,
            spo2: `${patient.status.currentSpO2}%`,
            temp: `${patient.status.currentTemperature}°C`,
            status: patient.status.priority
        }));

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#f1f5f9',
            padding: '32px 20px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Centered Main Layout Container */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Centered Header Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '20px',
                    padding: '24px 36px',
                    color: '#ffffff',
                    marginBottom: '32px',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
                    display: 'flex',
                    justify: 'center',
                    alignItems: 'center',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                        Unit Overview
                    </h1>
                </div>

                {/* Top Stat Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} style={{
                                background: stat.gradientBg,
                                padding: '24px 20px',
                                borderRadius: '20px',
                                border: `1.5px solid ${stat.borderColor}`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justify: 'center',
                                textAlign: 'center',
                                minHeight: '140px',
                                boxShadow: `0 8px 20px -4px ${stat.glowColor}`,
                                transition: 'transform 0.2s ease',
                                position: 'relative'
                            }}>
                                <div style={{ marginBottom: '10px' }}>
                                    {stat.dotColor ? (
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            backgroundColor: stat.dotColor,
                                            boxShadow: `0 0 0 5px ${stat.dotColor}33`
                                        }} />
                                    ) : (
                                        <div style={{ background: '#ffffff', padding: '10px', borderRadius: '14px', display: 'flex', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                            <Icon size={24} color={stat.accentColor} />
                                        </div>
                                    )}
                                </div>

                                <p style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                                    {stat.label}
                                </p>
                                <p style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: '2px 0 0 0', lineHeight: 1 }}>
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Active Alert Stream */}
                <div style={{
                    background: '#ffffff',
                    padding: '28px',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 15px -2px rgba(0,0,0,0.04)',
                    marginBottom: '32px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '10px', borderRadius: '12px', display: 'flex' }}>
                                <ShieldAlert size={22} color="#dc2626" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Active Alert Stream</h2>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>Real-time telemetry threshold triggers</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/alerts')}
                            style={{
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                color: '#2563eb',
                                padding: '8px 18px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            View Full Log <ArrowRight size={15} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {recentAlerts.map((alert) => {
                            const isHigh = alert.priority === 'HIGH';
                            const isMedium = alert.priority === 'MONITOR';

                            return (
                                <div
                                    key={alert.id}
                                    onClick={() => navigate(`/patients?patientId=${encodeURIComponent(alert.patient)}`)}
                                    style={{
                                    padding: '18px 24px',
                                    borderRadius: '14px',
                                    border: isHigh ? '1.5px solid #fca5a5' : isMedium ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                                    borderLeft: isHigh ? '8px solid #ef4444' : isMedium ? '8px solid #f59e0b' : '8px solid #94a3b8',
                                    background: isHigh ? '#fff5f5' : isMedium ? '#fffdf5' : '#f8fafc',
                                    display: 'flex',
                                    justify: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: isHigh ? '0 4px 12px rgba(239, 68, 68, 0.08)' : 'none',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: 0, paddingRight: '32px' }}>
                                        <span style={{
                                            padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', letterSpacing: '0.06em',
                                            background: isHigh ? '#dc2626' : isMedium ? '#d97706' : '#64748b',
                                            color: '#ffffff',
                                            boxShadow: isHigh ? '0 2px 6px rgba(220, 38, 38, 0.3)' : 'none'
                                        }}>
                                            {alert.priority}
                                        </span>
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Patient {alert.patient}</p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#475569', marginTop: '2px', fontWeight: '500', overflowWrap: 'anywhere' }}>{alert.type}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, minWidth: '88px', whiteSpace: 'nowrap', fontSize: '13px', color: '#64748b', fontWeight: '600', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <Clock size={14} color="#64748b" />
                                        <span>{alert.time}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Patients Requiring Attention Section */}
                <div style={{
                    background: '#ffffff',
                    padding: '28px',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 15px -2px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '10px', borderRadius: '12px', display: 'flex' }}>
                                <Activity size={22} color="#0284c7" />
                            </div>
                            <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Patients Requiring Attention</h2>
                        </div>
                        <button
                            onClick={() => navigate(`/patients?patientId=${encodeURIComponent(patient.id)}`)}
                            style={{
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                color: '#2563eb',
                                padding: '8px 18px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            All Patients Roster <ArrowRight size={15} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                        {priorityPatients.map((patient) => (
                            <div
                                key={patient.id}
                                onClick={() => navigate('/patients')}
                                style={{
                                    padding: '20px 24px',
                                    borderRadius: '16px',
                                    border: '1.5px solid #fca5a5',
                                    background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)',
                                    display: 'flex',
                                    justify: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 16px -4px rgba(239, 68, 68, 0.12)',
                                    transition: 'transform 0.15s ease'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontWeight: '800', fontSize: '17px', color: '#0f172a' }}>Patient {patient.id}</span>
                                        <span style={{ padding: '3px 10px', fontSize: '11px', fontWeight: '900', background: '#dc2626', color: '#ffffff', borderRadius: '6px' }}>{patient.status}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', color: '#334155', margin: '10px 0 0 0', fontWeight: '500' }}>
                                        HR: <strong style={{ color: '#0f172a', fontWeight: '800' }}>{patient.hr}</strong> | SpO₂: <strong style={{ color: '#0f172a', fontWeight: '800' }}>{patient.spo2}</strong> | Temp: <strong style={{ color: '#0f172a', fontWeight: '800' }}>{patient.temp}</strong>
                                    </p>
                                </div>
                                <div style={{ background: '#ffffff', padding: '8px', borderRadius: '50%', display: 'flex', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                                    <ChevronRight size={20} color="#dc2626" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function formatRelativeTime(timestamp) {
    const elapsedMinutes = Math.max(
        0,
        Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000)
    );

    if (elapsedMinutes < 1) {
        return 'just now';
    }
    if (elapsedMinutes < 60) {
        return `${elapsedMinutes}m ago`;
    }

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
        return `${elapsedHours}h ago`;
    }

    return `${Math.floor(elapsedHours / 24)}d ago`;
}