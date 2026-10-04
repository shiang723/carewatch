import React from 'react';
import { NavLink } from 'react-router-dom';
import carewatchLogo from '../assets/carewatch_logo.png';

export default function Sidebar({ alertCount = 0 }) {
    const navItems = [
        { label: 'Dashboard', path: '/', icon: '🏠' },
        { label: 'Patients', path: '/patients', icon: '👥' },
        { label: 'Alerts', path: '/alerts', icon: '🚨', badge: alertCount },
        { label: 'AI', path: '/ai', icon: '🤖' },
    ];

    return (
        <aside style={{
            width: '240px',
            backgroundColor: '#0f172a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 1rem',
            height: '100vh',
            boxSizing: 'border-box',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowY: 'auto',
            zIndex: 10
        }}>
            <div>
                {/* Upper Left Corner Logo */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    paddingTop: '0.5rem'
                }}>
                    <img
                        src={carewatchLogo}
                        alt="CareWatch Logo"
                        style={{
                            maxHeight: '52px',
                            maxWidth: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                {/* Navigation Links */}
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
                            {item.badge > 0 && (
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
        </aside>
    );
}