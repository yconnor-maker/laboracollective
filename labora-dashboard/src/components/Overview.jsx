import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { overviewStats, followerGrowthData, accountInfo } from '../data/mockData';
import './Overview.css';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`stat-card card ${accent ? 'accent' : ''}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{payload[0].value.toLocaleString()} followers</span>
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const { totalPosts, totalLikes, totalComments, avgEngagementRate, bestPost, followerCount, followerGrowth30d } = overviewStats;

  return (
    <div className="overview fade-in">
      {/* Stats grid */}
      <section className="stats-grid">
        <StatCard
          label="Followers"
          value={fmtNum(followerCount)}
          sub={`+${fmtNum(followerGrowth30d)} this month`}
          accent
        />
        <StatCard label="Total Posts" value={totalPosts} sub="last 30 days" />
        <StatCard label="Total Likes" value={fmtNum(totalLikes)} />
        <StatCard label="Total Comments" value={fmtNum(totalComments)} />
        <StatCard
          label="Avg Engagement"
          value={`${avgEngagementRate}%`}
          sub="industry avg: ~3.5%"
        />
      </section>

      {/* Best performing post */}
      <section className="best-post card">
        <div className="section-header">
          <h2>Best Performing Post</h2>
          <span className="badge badge-gold">⭐ Top Content</span>
        </div>
        <div className="best-post-body">
          <img
            className="best-post-thumb"
            src={bestPost.thumbnail}
            alt="Best post"
          />
          <div className="best-post-info">
            <p className="best-post-caption">{bestPost.caption}</p>
            <div className="best-post-meta">
              <span className="badge badge-green">{bestPost.engagementRate}% engagement</span>
              <span className="meta-item">❤️ {bestPost.likes.toLocaleString()}</span>
              <span className="meta-item">💬 {bestPost.comments.toLocaleString()}</span>
              <span className="meta-item muted">{bestPost.date}</span>
            </div>
            <div className="best-post-tags">
              {bestPost.hashtags.map(h => (
                <span key={h} className="tag">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Follower growth chart */}
      <section className="growth-chart card">
        <div className="section-header">
          <h2>Follower Growth</h2>
          <span className="secondary" style={{ fontSize: '0.82rem' }}>Last 30 days</span>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={followerGrowthData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8a6e30" />
                  <stop offset="100%" stopColor="#C9A84C" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(58,24,40,0.8)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#7a5a6a', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fill: '#7a5a6a', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v => fmtNum(v)}
                domain={['auto', 'auto']}
                width={42}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="url(#goldGrad)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#C9A84C', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footer">
          <span>
            <strong className="gold">+{fmtNum(followerGrowth30d)}</strong>
            <span className="secondary"> new followers in 30 days</span>
          </span>
          <span className="secondary">
            {accountInfo.username} · {fmtNum(followerCount)} total
          </span>
        </div>
      </section>
    </div>
  );
}
