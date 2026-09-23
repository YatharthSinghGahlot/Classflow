import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlusCircle, 
  BookOpen, 
  Layers, 
  Menu, 
  X, 
  LayoutDashboard,
  Sparkles,
  LogOut,
  ChevronDown,
  Settings,
  HardDrive
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLesson } from '../../context/LessonContext';

export default function Header({ currentRoute, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { googleAuthState, disconnectGoogle, setIsAuthModalOpen } = useLesson();

  const isConnected = Boolean(googleAuthState?.isConnected && googleAuthState?.user);
  const user = googleAuthState?.user;

  const navItems = [
    { label: 'Dashboard', route: '/', icon: LayoutDashboard },
    { label: 'Create Lesson', route: '/create', icon: PlusCircle },
    { label: 'Workspace', route: '/workspace', icon: Layers },
    { label: 'Resources', route: '/resources', icon: BookOpen },
    { label: 'My Lessons', route: '/history', icon: GraduationCap },
  ];

  const handleNav = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header 
      className="app-header no-print"
      style={{
        backgroundColor: 'var(--color-neutral)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-xs)',
        transition: 'background-color var(--transition-base), border-color var(--transition-base)'
      }}
    >
      <div 
        className="app-container" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px'
        }}
      >
        {/* Left: Brand / Logo */}
        <div 
          onClick={() => handleNav('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--rounded-md)',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(49, 134, 255, 0.25)',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <GraduationCap size={20} strokeWidth={2.2} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span 
              style={{ 
                fontFamily: 'var(--font-headline)',
                fontSize: '22px', 
                fontWeight: 400, 
                color: 'var(--color-secondary)',
                letterSpacing: '0px'
              }}
            >
              ClassFlow
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px'
          }} 
          className="desktop-nav"
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className="nav-link-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-headline)',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: '0px',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary-10)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--rounded-full)',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                  outline: 'none'
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Gmail Login / Account, Quick Create, Theme Toggle */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Quick Create Action */}
          <button
            onClick={() => handleNav('/create')}
            className="btn btn-primary btn-sm desktop-only"
            style={{ 
              display: 'none',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            <span>New Lesson</span>
          </button>

          {/* Google / Gmail Login Button OR Connected User Account */}
          {!isConnected ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn btn-secondary btn-sm desktop-only"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                borderRadius: 'var(--rounded-full)',
                padding: '6px 14px',
                fontFamily: 'var(--font-headline)',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-secondary)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)'
              }}
              title="Sign in with Google / Gmail"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          ) : (
            <div style={{ position: 'relative' }} className="desktop-only">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '3px 12px 3px 4px',
                  borderRadius: 'var(--rounded-full)',
                  backgroundColor: 'var(--color-tertiary)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <div 
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--rounded-full)',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-headline)',
                    fontWeight: 600,
                    fontSize: '13px',
                    overflow: 'hidden'
                  }}
                >
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user?.name?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <span 
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-secondary)',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {user?.name || 'Teacher'}
                </span>
                <ChevronDown size={14} color="var(--color-muted)" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div 
                    onClick={() => setProfileDropdownOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }} 
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '260px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--rounded-md)',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 100,
                      overflow: 'hidden',
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-tertiary)' }}>
                      <p style={{ fontFamily: 'var(--font-headline)', fontWeight: 600, fontSize: '14px', color: 'var(--color-secondary)' }}>
                        {user?.name}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--color-muted)', wordBreak: 'break-all', marginTop: '2px' }}>
                        {user?.email}
                      </p>
                      <div style={{ marginTop: '8px' }}>
                        <span className="chip" style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#E8F0FE', color: '#1A73E8' }}>
                          {googleAuthState?.isRealOAuth ? 'Google Live OAuth' : 'Gmail Connected'}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '6px' }}>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="dropdown-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'transparent',
                          borderRadius: 'var(--rounded-sm)',
                          fontSize: '13px',
                          color: 'var(--color-secondary)',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <Settings size={15} color="var(--color-muted)" />
                        <span>Google Account & Scopes</span>
                      </button>

                      {user?.folderUrl && (
                        <a
                          href={user.folderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="dropdown-item"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '8px 12px',
                            border: 'none',
                            background: 'transparent',
                            borderRadius: 'var(--rounded-sm)',
                            fontSize: '13px',
                            color: 'var(--color-secondary)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            textDecoration: 'none'
                          }}
                        >
                          <HardDrive size={15} color="var(--color-muted)" />
                          <span>Open Drive Folder</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          disconnectGoogle();
                        }}
                        className="dropdown-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'transparent',
                          borderRadius: 'var(--rounded-sm)',
                          fontSize: '13px',
                          color: 'var(--color-error)',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <LogOut size={15} color="var(--color-error)" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Theme Toggle in Top Right */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--rounded-sm)',
              color: 'var(--color-secondary)',
              cursor: 'pointer'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-drawer animate-fade-in"
          style={{
            backgroundColor: 'var(--color-neutral)',
            borderBottom: '1px solid var(--color-border)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Mobile Account Section */}
          <div style={{ marginBottom: '8px' }}>
            {!isConnected ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="btn btn-secondary"
                style={{ width: '100%', gap: '8px', justifyContent: 'center' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--color-tertiary)', borderRadius: 'var(--rounded-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)' }}>{user?.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>{user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    disconnectGoogle();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  fontFamily: 'var(--font-headline)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary-10)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--rounded-sm)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              marginTop: '8px',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            <button
              onClick={() => handleNav('/create')}
              className="btn btn-primary"
              style={{ width: '100%', gap: '8px' }}
            >
              <Sparkles size={16} />
              <span>Create New Lesson</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-link-btn:hover {
          background-color: var(--color-tertiary) !important;
          color: var(--color-secondary) !important;
        }
        .dropdown-item:hover {
          background-color: var(--color-tertiary) !important;
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-only {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
