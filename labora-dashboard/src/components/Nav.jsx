import { useState } from 'react';
import { accountInfo } from '../data/mockData';
import './Nav.css';

const CHANNELS = [
  { id: 'instagram', label: 'Instagram', icon: '📸', enabled: true },
  { id: 'tiktok',    label: 'TikTok',    icon: '🎵', enabled: false },
  { id: 'substack',  label: 'Substack',  icon: '✉️', enabled: false },
  { id: 'linkedin',  label: 'LinkedIn',  icon: '💼', enabled: false },
];

const TABS = ['Overview', 'Posts', 'Content Ideas'];

export default function Nav({ activeTab, onTabChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('instagram');

  const current = CHANNELS.find(c => c.id === selectedChannel);

  return (
    <header className="nav">
      <div className="nav-top">
        <div className="nav-brand">
          <span className="nav-logo">◆</span>
          <span className="nav-title">Labora Analytics</span>
        </div>

        <div className="nav-account">
          <img
            className="nav-avatar"
            src={accountInfo.profileImage}
            alt={accountInfo.displayName}
          />
          <div className="nav-account-info">
            <span className="nav-account-name">{accountInfo.displayName}</span>
            <span className="nav-account-handle">{accountInfo.username}</span>
          </div>
        </div>

        <div className="nav-channel-selector">
          <button
            className="channel-btn"
            onClick={() => setDropdownOpen(o => !o)}
          >
            <span className="channel-icon">{current.icon}</span>
            <span className="channel-label">{current.label}</span>
            <svg className={`channel-caret ${dropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {dropdownOpen && (
            <div className="channel-dropdown">
              {CHANNELS.map(ch => (
                <button
                  key={ch.id}
                  className={`channel-option ${ch.id === selectedChannel ? 'active' : ''} ${!ch.enabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (ch.enabled) {
                      setSelectedChannel(ch.id);
                      setDropdownOpen(false);
                    }
                  }}
                  disabled={!ch.enabled}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.label}</span>
                  {!ch.enabled && <span className="coming-soon">Soon</span>}
                  {ch.id === selectedChannel && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav className="nav-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}
