import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    AlertTriangle,
    ShieldAlert,
    Info,
    CheckCircle2,
    Clock,
    Bell,
    Check
} from 'lucide-react';

export default function AlertsPage({ alerts = [], onAcknowledge, error = '' }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const getSeverityDetails = (severity) => {
        switch (severity) {
            case 'HIGH':
                return {
                    label: 'HIGH',
                    color: '#dc2626',
                    bgColor: '#fee2e2',
                    borderColor: '#fca5a5',
                    icon: <ShieldAlert size={18} color="#dc2626" />
                };
            case 'MONITOR':
                return {
                    label: 'MONITOR',
                    color: '#b45309',
                    bgColor: '#fef3c7',
                    borderColor: '#fde68a',
                    icon: <AlertTriangle size={18} color="#d97706" />
                };
            case 'STABLE':
            default:
                return {
                    label: 'STABLE',
                    color: '#1d4ed8',
                    bgColor: '#dbeafe',
                    borderColor: '#bfdbfe',
                    icon: <Info size={18} color="#2563eb" />
                };
        }
    };

    const filteredAlerts = useMemo(() => {
        const severityOrder = {
            HIGH: 0,
            MONITOR: 1,
            STABLE: 2
        };

        return alerts.filter(alert => {
            const matchesSearch =
                alert.patientId.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                alert.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                alert.message.toLowerCase().includes(searchQuery.toLowerCase().trim());

            const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
            const matchesStatus = statusFilter === 'ALL' || alert.status === statusFilter;

            return matchesSearch && matchesSeverity && matchesStatus;
        }).sort((a, b) => {
            return (severityOrder[a.severity] ?? Number.MAX_SAFE_INTEGER)
                - (severityOrder[b.severity] ?? Number.MAX_SAFE_INTEGER);
        });
    }, [alerts, searchQuery, severityFilter, statusFilter]);

    const activeCount = alerts.filter(a => a.status === 'Active').length;
    const highSeverityCount = alerts.filter(a => a.severity === 'HIGH' && a.status === 'Active').length;
    const acknowledgedCount = alerts.filter(a => a.status === 'Acknowledged').length;

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            padding: '40px 20px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                        System Alerts
                    </h1>
                </div>

                {/* Summary Stat Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: '2px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ padding: '12px', borderRadius: '12px', background: '#fee2e2' }}>
                            <Bell size={24} color="#dc2626" />
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Active Alerts</div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{activeCount}</div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: '2px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ padding: '12px', borderRadius: '12px', background: '#fef3c7' }}>
                            <ShieldAlert size={24} color="#d97706" />
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>High Severity</div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{highSeverityCount}</div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: '2px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ padding: '12px', borderRadius: '12px', background: '#dbeafe' }}>
                            <Clock size={24} color="#2563eb" />
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Acknowledged</div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{acknowledgedCount}</div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justify: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '28px'
                }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search
                            size={22}
                            color="#3b82f6"
                            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search by Patient ID, title, or details..."
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
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#475569' }}>Severity:</span>
                            <select
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #cbd5e1',
                                    backgroundColor: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    color: '#0f172a',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="ALL">All Severities</option>
                                <option value="HIGH">High Only</option>
                                <option value="MONITOR">Monitor Only</option>
                                <option value="STABLE">Stable Only</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#475569' }}>Status:</span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #cbd5e1',
                                    backgroundColor: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    color: '#0f172a',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Acknowledged">Acknowledged</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        border: '1px solid #fca5a5',
                        borderRadius: '12px',
                        padding: '14px 18px',
                        marginBottom: '20px',
                        fontWeight: '700'
                    }}>
                        {error}
                    </div>
                )}

                {/* Alerts List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {filteredAlerts.length === 0 ? (
                        <div style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '18px',
                            border: '2px solid #cbd5e1',
                            padding: '48px',
                            textAlign: 'center',
                            color: '#64748b'
                        }}>
                            <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '12px' }} />
                            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>No alerts match your filter</h3>
                            <p style={{ margin: '6px 0 0 0', fontSize: '15px' }}>All systems and patient vitals operating within normal parameters.</p>
                        </div>
                    ) : (
                        filteredAlerts.map((alert) => {
                            const severityInfo = getSeverityDetails(alert.severity);

                            return (
                                <div
                                    key={alert.id}
                                    onClick={() => navigate(`/patients?patientId=${encodeURIComponent(alert.patientId)}`)}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '18px',
                                        border: `2px solid ${alert.status === 'Active' ? severityInfo.borderColor : '#cbd5e1'}`,
                                        padding: '24px 28px',
                                        display: 'flex',
                                        justify: 'space-between',
                                        alignItems: 'center',
                                        gap: '24px',
                                        opacity: alert.status === 'Resolved' ? 0.65 : 1,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <div style={{
                                                background: severityInfo.bgColor,
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                {severityInfo.icon}
                                                <span style={{ fontSize: '12px', fontWeight: '900', color: severityInfo.color }}>
                                                    {severityInfo.label}
                                                </span>
                                            </div>

                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                color: '#0f172a',
                                                backgroundColor: '#f1f5f9',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                border: '1px solid #cbd5e1'
                                            }}>
                                                Patient {alert.patientId}
                                            </span>

                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={14} />
                                                {alert.timestamp}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
                                            {alert.title}
                                        </h3>
                                        <p style={{ fontSize: '15px', fontWeight: '500', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                                            {alert.message}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {alert.status === 'Active' && (
                                            <>
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        onAcknowledge(alert.id);
                                                    }}
                                                    style={{
                                                        backgroundColor: '#f1f5f9',
                                                        border: '2px solid #cbd5e1',
                                                        color: '#0f172a',
                                                        padding: '10px 18px',
                                                        borderRadius: '12px',
                                                        fontSize: '14px',
                                                        fontWeight: '800',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    }}
                                                >
                                                    <Check size={16} />
                                                    Acknowledge
                                                </button>

                                            </>
                                        )}

                                        {alert.status === 'Acknowledged' && (
                                            <>
                                                <span style={{
                                                    fontSize: '13px',
                                                    fontWeight: '800',
                                                    color: '#d97706',
                                                    backgroundColor: '#fef3c7',
                                                    padding: '6px 14px',
                                                    borderRadius: '20px',
                                                    border: '1px solid #fde68a'
                                                }}>
                                                    Acknowledged
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}