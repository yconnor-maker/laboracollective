import { useState } from 'react';
import { posts } from '../data/mockData';
import './Posts.css';

const TYPE_ICONS = { reel: '🎬', carousel: '🔲', post: '🖼️' };

function engagementColor(rate) {
  if (rate >= 12) return 'badge-green';
  if (rate >= 8) return 'badge-gold';
  return 'badge-purple';
}

function PostCard({ post, onClick }) {
  return (
    <button className="post-card" onClick={() => onClick(post)}>
      <div className="post-thumb-wrap">
        <img className="post-thumb" src={post.thumbnail} alt="post" loading="lazy" />
        <span className="post-type-badge">{TYPE_ICONS[post.type]}</span>
      </div>
      <div className="post-card-body">
        <p className="post-caption">{post.caption}</p>
        <div className="post-stats">
          <span className="post-stat">❤️ {post.likes.toLocaleString()}</span>
          <span className="post-stat">💬 {post.comments.toLocaleString()}</span>
          <span className={`badge ${engagementColor(post.engagementRate)}`}>
            {post.engagementRate}%
          </span>
        </div>
        <span className="post-date">{post.date}</span>
      </div>
    </button>
  );
}

function PostModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-inner">
          <img className="modal-image" src={post.thumbnail} alt="post" />
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-type">{TYPE_ICONS[post.type]} {post.type}</span>
              <span className={`badge ${engagementColor(post.engagementRate)}`}>
                {post.engagementRate}% engagement
              </span>
            </div>

            <p className="modal-caption">{post.caption}</p>

            <div className="divider" />

            <div className="modal-metrics">
              <div className="metric">
                <span className="metric-icon">❤️</span>
                <div>
                  <span className="metric-value">{post.likes.toLocaleString()}</span>
                  <span className="metric-label">Likes</span>
                </div>
              </div>
              <div className="metric">
                <span className="metric-icon">💬</span>
                <div>
                  <span className="metric-value">{post.comments.toLocaleString()}</span>
                  <span className="metric-label">Comments</span>
                </div>
              </div>
              <div className="metric">
                <span className="metric-icon">📈</span>
                <div>
                  <span className="metric-value">{post.engagementRate}%</span>
                  <span className="metric-label">Eng. Rate</span>
                </div>
              </div>
              <div className="metric">
                <span className="metric-icon">📅</span>
                <div>
                  <span className="metric-value">{post.date}</span>
                  <span className="metric-label">Posted</span>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="modal-hashtags">
              <span className="modal-section-label">Hashtags</span>
              <div className="tag-row">
                {post.hashtags.map(h => (
                  <span key={h} className="tag">{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Posts() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="posts-page fade-in">
      <div className="posts-header">
        <h2>All Posts</h2>
        <span className="secondary" style={{ fontSize: '0.85rem' }}>{posts.length} posts · click any card to see details</span>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onClick={setSelected} />
        ))}
      </div>

      <PostModal post={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
