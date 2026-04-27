import { useState } from 'react';
import { contentIdeas, topPerformingPostsSummary } from '../data/mockData';
import './ContentIdeas.css';

function viralBadge(score) {
  if (score >= 95) return { cls: 'badge-green', label: `🔥 ${score} Viral` };
  if (score >= 90) return { cls: 'badge-gold', label: `⚡ ${score} Hot` };
  return { cls: 'badge-purple', label: `✨ ${score} Strong` };
}

function IdeaCard({ idea, isNew }) {
  const vb = viralBadge(idea.viralScore);
  return (
    <div className={`idea-card card ${isNew ? 'idea-card--new' : ''}`}>
      <div className="idea-header">
        <span className="idea-number">{String(idea.id).includes('gen') ? '✦' : '#'}{idea.id.replace('ci', '').replace('gen-', '')}</span>
        <span className={`badge ${vb.cls}`}>{vb.label}</span>
      </div>

      <div className="idea-hook">
        <span className="idea-hook-label">Hook</span>
        <p className="idea-hook-text">{idea.hook}</p>
      </div>

      <div className="idea-caption">
        <span className="idea-section-label">Suggested Caption</span>
        <p className="idea-caption-text">{idea.caption}</p>
      </div>

      <div className="idea-hashtags">
        <span className="idea-section-label">Hashtags</span>
        <div className="idea-tags">
          {idea.hashtags.map(h => (
            <span key={h} className="tag">{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseGeneratedIdeas(text) {
  const ideas = [];
  const blocks = text.split(/---|\n#{1,3} Idea \d+/i).filter(b => b.trim().length > 20);

  blocks.forEach((block, i) => {
    const hookMatch = block.match(/\*\*Hook[:\*]*\*\*[:\s]+([^\n]+)/i)
      || block.match(/Hook[:\s]+([^\n]+)/i);
    const captionMatch = block.match(/\*\*(?:Suggested )?Caption[:\*]*\*\*[:\s]+([\s\S]+?)(?=\*\*Hashtag|\*\*Viral|$)/i)
      || block.match(/Caption[:\s]+([\s\S]+?)(?=Hashtag|Viral|$)/i);
    const hashtagsMatch = block.match(/\*\*Hashtag[s]?[:\*]*\*\*[:\s]+([\s\S]+?)(?=\*\*Viral|$)/i)
      || block.match(/Hashtag[s]?[:\s]+([\s\S]+?)(?=Viral|$)/i);
    const viralMatch = block.match(/\*\*Viral Score[:\*]*\*\*[:\s]+(\d+)/i)
      || block.match(/Viral Score[:\s]+(\d+)/i);

    if (hookMatch) {
      const rawTags = hashtagsMatch ? hashtagsMatch[1].trim() : '';
      const hashtags = rawTags
        .split(/[\s,]+/)
        .filter(t => t.startsWith('#'))
        .slice(0, 6);

      ideas.push({
        id: `gen-${i + 1}`,
        hook: hookMatch[1].trim().replace(/^["']|["']$/g, ''),
        caption: captionMatch
          ? captionMatch[1].trim().replace(/\*\*/g, '').slice(0, 400)
          : block.trim().slice(0, 200),
        hashtags: hashtags.length ? hashtags : ['#womenshealth', '#OBGYN', '#reproductive'],
        viralScore: viralMatch ? parseInt(viralMatch[1]) : Math.floor(Math.random() * 10 + 88),
      });
    }
  });

  return ideas.slice(0, 3);
}

export default function ContentIdeas() {
  const [ideas, setIdeas] = useState(contentIdeas);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateIdeas = async () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      setError('No API key found. Set VITE_ANTHROPIC_API_KEY in your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    const topPostsContext = topPerformingPostsSummary
      .map((p, i) => `${i + 1}. Caption: "${p.caption}" | Engagement: ${p.engagementRate}% | Hashtags: ${p.hashtags.join(', ')}`)
      .join('\n');

    const prompt = `You are a social media strategist for Dr. Yamicia Connor, an OB/GYN physician and women's health advocate with ~48K Instagram followers. Her top-performing posts are:

${topPostsContext}

Generate exactly 3 new content ideas in the same format. For each idea provide:
**Hook**: A single punchy opening line (in quotes)
**Suggested Caption**: 2-3 sentences of caption copy
**Hashtags**: 5-6 relevant hashtags starting with #
**Viral Score**: A number 85-99 estimating viral potential

Separate each idea with ---

Focus on reproductive health education, perimenopause, maternal health disparities, reproductive justice, or behind-the-scenes content.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1200,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const parsed = parseGeneratedIdeas(text);

      if (parsed.length === 0) {
        throw new Error('Could not parse response. Try again.');
      }

      setGeneratedIdeas(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ideas-page fade-in">
      <div className="ideas-header">
        <div>
          <h2>Content Ideas</h2>
          <p className="ideas-subtitle secondary">
            AI-generated ideas based on @dr.yamicia's top-performing posts
          </p>
        </div>
        <button
          className="generate-btn"
          onClick={generateIdeas}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Generating…
            </>
          ) : (
            <>
              ✦ Generate More Ideas
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="ideas-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {generatedIdeas.length > 0 && (
        <section className="ideas-section">
          <div className="ideas-section-header">
            <h3>AI Generated Ideas</h3>
            <span className="badge badge-green">New</span>
          </div>
          <div className="ideas-grid">
            {generatedIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} isNew />
            ))}
          </div>
        </section>
      )}

      <section className="ideas-section">
        <div className="ideas-section-header">
          <h3>Curated Ideas</h3>
          <span className="secondary" style={{ fontSize: '0.8rem' }}>{ideas.length} ideas based on top posts</span>
        </div>
        <div className="ideas-grid">
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} isNew={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
