import { useState } from 'react';
import Nav from './components/Nav';
import Overview from './components/Overview';
import Posts from './components/Posts';
import ContentIdeas from './components/ContentIdeas';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="app">
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="app-main">
        {activeTab === 'Overview'      && <Overview />}
        {activeTab === 'Posts'         && <Posts />}
        {activeTab === 'Content Ideas' && <ContentIdeas />}
      </main>
    </div>
  );
}
