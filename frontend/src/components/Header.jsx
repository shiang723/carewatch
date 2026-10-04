import React from 'react';
import carewatchLogo from '../assets/carewatch_logo.png';

export default function Header() {
    return (
        <header style={{
            height: '70px',
            backgroundColor: '#ffffff',
            borderBottom: '2px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            boxSizing: 'border-box'
        }}>
            {/* Prominent CareWatch Banner / Logo Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                    src={carewatchLogo}
                    alt="CareWatch"
                    style={{ height: '42px', objectFit: 'contain' }}
                />
                <span style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#0f172a',
                    letterSpacing: '-0.03em'
                }}>
                    CareWatch
                </span>
            </div>

            {/* Upper Right Hand Corner */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#f8fafc',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                }}>
                    JS
                </div>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
                        John Smith
                    </div>
                </div>
            </div>
        </header>
    );
}