import React, { useState } from 'react';
import Modal from './Modal';
import { 
  CheckCircle2, 
  Key, 
  ExternalLink, 
  Mail, 
  FileSpreadsheet, 
  HardDrive, 
  GraduationCap, 
  LogOut, 
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useLesson } from '../../context/LessonContext';
import { googleAuth } from '../../services/googleAuth';

export default function GoogleConnectModal({ isOpen, onClose, onSuccess, initialReason = '' }) {
  const { googleAuthState, connectGoogle, disconnectGoogle, loginWithGmail, showToast } = useLesson();
  
  const [gmailAddress, setGmailAddress] = useState('');
  const [educatorName, setEducatorName] = useState('');
  const [clientId, setClientId] = useState(() => googleAuth.getClientId());
  const [customToken, setCustomToken] = useState('');
  const [activeTab, setActiveTab] = useState('gmail'); // 'gmail' | 'gis' | 'token'
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isConnected = Boolean(googleAuthState?.isConnected && googleAuthState?.user);
  const isReal = Boolean(googleAuthState?.isRealOAuth && googleAuthState?.accessToken);

  // Handle direct Gmail address login
  const handleGmailLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    
    const emailToUse = (gmailAddress || '').trim() || 'educator.classflow@gmail.com';
    try {
      loginWithGmail({ email: emailToUse, name: educatorName });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in with Gmail');
    }
  };

  // Quick preset login
  const handleQuickPreset = (email, name) => {
    setGmailAddress(email);
    setEducatorName(name);
    try {
      loginWithGmail({ email, name });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in');
    }
  };

  // Handle Google Identity Services (GIS) OAuth popup
  const handleSignInWithGoogle = async () => {
    setIsConnecting(true);
    setErrorMessage('');
    try {
      if (!clientId.trim()) {
        setErrorMessage('Please enter your Google OAuth Web Client ID below, or use the "Gmail Login" tab for instant access.');
        setIsConnecting(false);
        return;
      }
      googleAuth.setClientId(clientId.trim());
      await connectGoogle({ clientId: clientId.trim() });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to authenticate with Google');
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle raw OAuth token
  const handleConnectWithToken = async () => {
    if (!customToken.trim()) {
      setErrorMessage('Please paste a valid Google OAuth Access Token.');
      return;
    }
    setIsConnecting(true);
    setErrorMessage('');
    try {
      await googleAuth.connectWithToken(customToken);
      showToast('Google OAuth Token verified and connected', 'success');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired token.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectGoogle();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Google & Gmail Account"
      subtitle="Sign in with your Gmail or Google Account to enable automatic Drive backups, live Forms quizzes, and direct Gmail delivery"
      maxWidth="580px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Notice reason if provided */}
        {initialReason && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: 'var(--rounded-md)',
              backgroundColor: 'var(--color-primary-10)',
              border: '1px solid var(--color-primary-40)',
              color: 'var(--color-primary)',
              fontSize: '14px'
            }}
          >
            <Sparkles size={18} style={{ flexShrink: 0 }} />
            <span>{initialReason}</span>
          </div>
        )}

        {/* Current Connection Status */}
        <div 
          style={{
            padding: '16px',
            borderRadius: 'var(--rounded-md)',
            backgroundColor: isConnected 
              ? (isReal ? 'rgba(30, 142, 62, 0.08)' : 'rgba(66, 133, 244, 0.08)')
              : 'var(--color-surface)',
            border: isConnected
              ? (isReal ? '1px solid #CEEAD6' : '1px solid rgba(66, 133, 244, 0.25)')
              : '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: isConnected ? 'var(--color-primary)' : 'var(--color-muted)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '16px',
                overflow: 'hidden',
                flexShrink: 0
              }}
            >
              {googleAuthState?.user?.avatarUrl ? (
                <img 
                  src={googleAuthState.user.avatarUrl} 
                  alt="Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                googleAuthState?.user?.name?.[0]?.toUpperCase() || <Mail size={20} />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '15px' }}>
                  {googleAuthState?.user?.name || 'Not Signed In'}
                </span>
                {isConnected && (
                  <span 
                    className="chip" 
                    style={{ 
                      fontSize: '11px', 
                      padding: '2px 8px', 
                      backgroundColor: isReal ? '#E6F4EA' : '#E8F0FE', 
                      color: isReal ? '#1E8E3E' : '#1A73E8',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ShieldCheck size={12} />
                    <span>{isReal ? 'Live OAuth' : 'Gmail Connected'}</span>
                  </span>
                )}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '2px' }}>
                {googleAuthState?.user?.email || 'Sign in below to unlock Google Forms, Gmail sending, and Drive auto-sync'}
              </p>
            </div>
          </div>

          {isConnected && (
            <button
              type="button"
              onClick={handleDisconnect}
              className="btn btn-secondary btn-sm"
              title="Sign Out of Google Account"
              style={{ gap: '6px', flexShrink: 0 }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Supported Features Grid */}
        <div>
          <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Connected Google Workspace Capabilities
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: 'var(--rounded-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <Mail size={16} color="#EA4335" />
              <span>Gmail Dispatch</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: 'var(--rounded-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <FileSpreadsheet size={16} color="#7C3AED" />
              <span>Google Forms Quiz</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: 'var(--rounded-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <HardDrive size={16} color="#1E8E3E" />
              <span>Drive Auto-Backup</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: 'var(--rounded-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <GraduationCap size={16} color="#0D9488" />
              <span>Google Classroom</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
          <button
            type="button"
            onClick={() => { setActiveTab('gmail'); setErrorMessage(''); }}
            style={{
              padding: '6px 14px',
              fontFamily: 'var(--font-headline)',
              fontSize: '14px',
              fontWeight: activeTab === 'gmail' ? 500 : 400,
              color: activeTab === 'gmail' ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: activeTab === 'gmail' ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Gmail Sign-In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('gis'); setErrorMessage(''); }}
            style={{
              padding: '6px 14px',
              fontFamily: 'var(--font-headline)',
              fontSize: '14px',
              fontWeight: activeTab === 'gis' ? 500 : 400,
              color: activeTab === 'gis' ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: activeTab === 'gis' ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Google OAuth 2.0
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('token'); setErrorMessage(''); }}
            style={{
              padding: '6px 14px',
              fontFamily: 'var(--font-headline)',
              fontSize: '14px',
              fontWeight: activeTab === 'token' ? 500 : 400,
              color: activeTab === 'token' ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: activeTab === 'token' ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Access Token
          </button>
        </div>

        {errorMessage && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--rounded-sm)',
              backgroundColor: 'var(--error-light)',
              border: '1px solid var(--error-border)',
              color: 'var(--color-error)',
              fontSize: '13px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab 1: Gmail Sign-In Form */}
        {activeTab === 'gmail' && (
          <form onSubmit={handleGmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
                Your Gmail Address:
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={gmailAddress}
                  onChange={(e) => setGmailAddress(e.target.value)}
                  placeholder="teacher@gmail.com"
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: 'var(--rounded-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-neutral)',
                    fontSize: '14px',
                    color: 'var(--color-on-surface)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
                Display Name (Optional):
              </label>
              <input
                type="text"
                value={educatorName}
                onChange={(e) => setEducatorName(e.target.value)}
                placeholder="e.g. Ms. Roberts"
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--rounded-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-neutral)',
                  fontSize: '14px',
                  color: 'var(--color-on-surface)'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '44px',
                gap: '10px',
                backgroundColor: '#1A73E8',
                borderColor: '#1A73E8',
                color: '#FFFFFF',
                borderRadius: 'var(--rounded-full)',
                fontFamily: 'var(--font-headline)',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Gmail</span>
            </button>

            {/* Quick Demo Shortcuts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>Quick preset accounts:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('educator.classflow@gmail.com', 'Demo Educator')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '12px', gap: '6px' }}
                >
                  <UserCheck size={13} />
                  <span>Demo Educator</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('sarah.science@gmail.com', 'Sarah Jenkins')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '12px', gap: '6px' }}
                >
                  <UserCheck size={13} />
                  <span>Sarah Jenkins (Science Lead)</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Google Identity Services / Web Client ID */}
        {activeTab === 'gis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
                Google Cloud OAuth 2.0 Client ID:
              </label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="e.g. 123456789-abcdefg.apps.googleusercontent.com"
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--rounded-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-neutral)',
                  fontSize: '13px',
                  color: 'var(--color-on-surface)'
                }}
              />
              <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
                From Google Cloud Console &rarr; Credentials &rarr; OAuth 2.0 Client ID (Web Application).
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignInWithGoogle}
              disabled={isConnecting}
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '44px',
                gap: '10px',
                backgroundColor: '#1A73E8',
                borderColor: '#1A73E8',
                color: '#FFFFFF',
                borderRadius: 'var(--rounded-full)'
              }}
            >
              {isConnecting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              )}
              <span>{isConnecting ? 'Authenticating with Google...' : 'Sign in with Google OAuth Popup'}</span>
            </button>
          </div>
        )}

        {/* Tab 3: Direct Token Input */}
        {activeTab === 'token' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)' }}>
                  Google OAuth 2.0 Access Token:
                </label>
                <a 
                  href="https://developers.google.com/oauthplayground" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                >
                  <span>OAuth Playground</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <textarea
                rows={3}
                value={customToken}
                onChange={(e) => setCustomToken(e.target.value)}
                placeholder="ya29.a0AfH6SM..."
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--rounded-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-neutral)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-on-surface)'
                }}
              />
              <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
                Paste a token with <code>forms.body</code> and <code>gmail.send</code> scopes for instant live API execution.
              </p>
            </div>

            <button
              type="button"
              onClick={handleConnectWithToken}
              disabled={isConnecting}
              className="btn btn-primary"
              style={{ width: '100%', height: '42px', gap: '8px' }}
            >
              {isConnecting ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
              <span>{isConnecting ? 'Verifying Token...' : 'Connect OAuth Token'}</span>
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-border)'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
