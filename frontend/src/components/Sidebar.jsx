import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    const navItems = [
        { label: 'Dashboard', path: '/', icon: '🏠' },
        { label: 'Patients', path: '/patients', icon: '👥' },
        { label: 'Alerts', path: '/alerts', icon: '🚨', badge: 3 },
        { label: 'Analytics', path: '/analytics', icon: '📊' },
        { label: 'AI', path: '/ai', icon: '🤖' },
        { label: 'Settings', path: '/settings', icon: '⚙️' }
    ]

    return (
        <aside style={{
            width: '240px',
            backgroundColor: '#0f172a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 1rem',
            minHeight: '100vh'
        }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🩺</span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>CareWatch</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                color: isActive ? '#fff' : '#94a3b8',
                                backgroundColor: isActive ? '#1e293b' : 'transparent',
                                textDecoration: 'none',
                                fontWeight: isActive ? 600 : 400,
                                transition: 'all 0.15s ease'
                            })}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span style={{
                                    backgroundColor: '#ef4444',
                                    color: '#fff',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    borderRadius: '9999px',
                                    padding: '0.15rem 0.5rem'
                                }}>
                  {item.badge}
                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div style={{ paddingLeft: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
                <p style={{ margin: 0 }}>Better insights.</p>
                <p style={{ margin: 0 }}>Healthier tomorrows.</p>
            </div>
        </aside>
    )
}