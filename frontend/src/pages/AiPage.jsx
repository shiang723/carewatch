import React, { useState } from 'react';
import { Bot, Send, Sparkles, ShieldCheck } from 'lucide-react';

export default function AiPage() {
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: 'Hello Bob! I am your CareWatch AI Clinical Assistant. I have access to real-time telemetry and patient alert logs. How can I assist you with patient triaging or diagnostic insights today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const quickPrompts = [
        "Analyze Patient A104's critical vitals",
        "Which patients need immediate intervention?",
        "Draft shift summary notes for Patient A105",
        "What are typical causes for SpO₂ drop to 87%?"
    ];

    const handleSendMessage = (textToSend) => {
        const query = textToSend || input;
        if (!query.trim()) return;

        // Add user message
        const userMsg = { sender: 'user', text: query };
        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            let aiReply = "I've analyzed the patient telemetry. Everything appears within standard monitoring parameters.";

            const qLower = query.toLowerCase();
            if (qLower.includes('a104')) {
                aiReply = "Patient A104 is exhibiting severe hypoxemia (SpO₂: 87%) combined with tachycardia (HR: 128 BPM) and a fever (38.4°C). Recommended immediate action: Administer supplemental O₂ and check airway clearance.";
            } else if (qLower.includes('immediate') || qLower.includes('intervention') || qLower.includes('priority')) {
                aiReply = "Top Priority: Patient A104 (CRITICAL). Secondary Watch: Patients A105 and A102 due to sustained elevated heart rates and low-grade fevers.";
            } else if (qLower.includes('a105') || qLower.includes('shift summary')) {
                aiReply = "Shift Summary for A105: Patient experienced moderate tachycardia (HR 115) and hyperthermia (38.6°C). SpO₂ remains stable at 94%. Recommend antipyretic evaluation.";
            } else if (qLower.includes('spo2') || qLower.includes('87%')) {
                aiReply = "An SpO₂ drop to 87% combined with HR 128 BPM often points to acute respiratory distress, pulmonary embolism, severe atelectasis, or fluid overload. Immediate bedside assessment is required.";
            }

            setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            padding: '40px 20px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            padding: '12px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }}>
                            <Bot size={32} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                                CareWatch AI Assistant
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Expanded Full-Width Chat Interface */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    border: '2px solid #cbd5e1',
                    boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 220px)',
                    minHeight: '750px',
                    overflow: 'hidden'
                }}>
                    {/* Chat Header */}
                    <div style={{
                        padding: '18px 28px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Sparkles size={22} color="#60a5fa" />
                            <span style={{ fontWeight: '800', fontSize: '16px' }}>Clinical Copilot Workspace</span>
                        </div>
                        <span style={{
                            backgroundColor: '#1e293b',
                            color: '#10b981',
                            border: '1px solid #059669',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        </span>
                    </div>

                    {/* Large Messages Scroll Area */}
                    <div style={{
                        flex: 1,
                        padding: '32px 40px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: '#f8fafc'
                    }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '14px',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                {msg.sender === 'ai' && (
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3b82f6',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        <Bot size={24} />
                                    </div>
                                )}

                                <div style={{
                                    maxWidth: '80%',
                                    padding: '16px 22px',
                                    borderRadius: '18px',
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    fontWeight: '500',
                                    backgroundColor: msg.sender === 'user' ? '#0f172a' : '#ffffff',
                                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                                    border: msg.sender === 'ai' ? '1.5px solid #cbd5e1' : 'none',
                                    boxShadow: msg.sender === 'ai' ? '0 4px 12px rgba(0,0,0,0.03)' : 'none'
                                }}>
                                    {msg.text}
                                </div>

                                {msg.sender === 'user' && (
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        backgroundColor: '#64748b',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontWeight: '900',
                                        fontSize: '17px'
                                    }}>
                                        B
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#64748b', fontSize: '15px', fontWeight: '600' }}>
                                <Bot size={22} color="#3b82f6" />
                                <span>CareWatch AI is analyzing telemetry...</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Suggestions Strip */}
                    <div style={{ padding: '12px 28px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', overflowX: 'auto' }}>
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(prompt)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '20px',
                                    border: '1.5px solid #cbd5e1',
                                    backgroundColor: '#f1f5f9',
                                    color: '#0f172a',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                ✨ {prompt}
                            </button>
                        ))}
                    </div>

                    {/* Bottom Prompt Input */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                        style={{
                            padding: '20px 28px',
                            backgroundColor: '#ffffff',
                            borderTop: '2px solid #cbd5e1',
                            display: 'flex',
                            gap: '14px'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Ask CareWatch AI about patients, vitals, or medical advice..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '14px 20px',
                                borderRadius: '14px',
                                border: '2px solid #cbd5e1',
                                fontSize: '16px',
                                fontWeight: '600',
                                outline: 'none',
                                color: '#0f172a'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#3b82f6',
                                color: '#ffffff',
                                border: 'none',
                                padding: '14px 28px',
                                borderRadius: '14px',
                                fontWeight: '800',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            Send <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}