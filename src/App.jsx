import { useMemo, useState } from 'react';
import {
  ArrowRight,
  AudioLines,
  CalendarDays,
  Check,
  ExternalLink,
  Headphones,
  Instagram,
  Mic2,
  Music2,
  Play,
  Send,
  SlidersHorizontal,
  Youtube,
} from 'lucide-react';
import {
  contactEmail,
  links,
  navItems,
  projectTypes,
  services,
  tracks,
} from './data.js';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const serviceIcons = {
  sliders: SlidersHorizontal,
  mic: Mic2,
  meters: AudioLines,
  youtube: Youtube,
};

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Mike P Studio home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>Mike P Studio</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="button button-primary header-cta" href="#contact">
        Book a project call <ArrowRight size={18} />
      </a>
    </header>
  );
}

function SocialLinks({ compact = false }) {
  return (
    <div className={compact ? 'socials compact' : 'socials'} aria-label="Social links">
      <a href={links.mikeYoutube} aria-label="YouTube Mike P" target="_blank" rel="noreferrer">
        <Youtube size={compact ? 16 : 18} />
      </a>
      <a href={links.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
        <Instagram size={compact ? 16 : 18} />
      </a>
      <a href={links.tiktok} aria-label="TikTok" target="_blank" rel="noreferrer">
        <Music2 size={compact ? 16 : 18} />
      </a>
      <a href={links.spotify} aria-label="Spotify" target="_blank" rel="noreferrer">
        <Headphones size={compact ? 16 : 18} />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-edge" id="home">
      <div className="hero-copy">
        <h1>Michael Papaleontiou</h1>
        <p className="role-line">
          Music Producer <span /> Mixing Engineer <span /> YouTuber
        </p>
        <h2>Record. Mix. Release heavier.</h2>
        <p className="hero-lede">
          Modern metal production from a studio built for loud bands.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            Book a project call <ArrowRight size={20} />
          </a>
          <a className="button button-secondary" href="#mixes">
            Hear the mixes <Play size={18} />
          </a>
        </div>
        <SocialLinks />
      </div>
      <div className="hero-media" aria-hidden="true">
        <img src={asset('studio-control-room.jpg')} alt="" />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-rail" id="services" aria-label="Studio services">
      {services.map((service) => {
        const Icon = serviceIcons[service.icon];
        return (
          <article className="service-item" key={service.title}>
            <Icon size={44} aria-hidden="true" />
            <div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function TrackCard({ track, active, onSelect }) {
  return (
    <button
      className={active ? 'track-card active' : 'track-card'}
      type="button"
      onClick={() => onSelect(track)}
      aria-pressed={active}
    >
      <span className={`track-art ${track.className}`} aria-hidden="true" />
      <span className="track-copy">
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
        <span className="waveform" aria-hidden="true" />
      </span>
      <span className="play-dot" aria-hidden="true">
        <Play size={18} />
      </span>
    </button>
  );
}

function Mixes() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  return (
    <section className="mixes section-edge" id="mixes">
      <div className="section-intro">
        <p>Metal Tracks</p>
        <h2>Hear the mixes</h2>
        <a className="outline-link" href={links.driveFolder} target="_blank" rel="noreferrer">
          View more tracks
        </a>
      </div>
      <div className="track-area">
        <div className="track-grid">
          {tracks.map((track) => (
            <TrackCard
              active={selectedTrack.title === track.title}
              key={track.title}
              onSelect={setSelectedTrack}
              track={track}
            />
          ))}
        </div>
        <div className="audio-panel">
          <div>
            <p>Now playing</p>
            <h3>{selectedTrack.title}</h3>
            <a href={selectedTrack.preview} target="_blank" rel="noreferrer">
              Open Drive preview <ExternalLink size={14} />
            </a>
          </div>
          <iframe
            title={`${selectedTrack.title} audio preview`}
            src={selectedTrack.preview}
            allow="autoplay"
          />
        </div>
      </div>
    </section>
  );
}

function YoutubeEducation() {
  return (
    <section className="youtube-section section-edge" id="youtube">
      <a className="video-card" href={links.featuredVideo} target="_blank" rel="noreferrer">
        <img
          src="https://i.ytimg.com/vi_webp/jZYf0xPY4Us/maxresdefault.webp"
          alt="MixingMadeEasy YouTube video thumbnail"
        />
        <span aria-hidden="true">
          <Play size={36} />
        </span>
      </a>
      <div className="youtube-copy">
        <p>YouTube Education</p>
        <h2>MixingMadeEasy</h2>
        <p>
          Step by step mixing and production tutorials to help you level up your
          sound.
        </p>
        <a className="outline-link" href={links.mixingYoutube} target="_blank" rel="noreferrer">
          Watch on YouTube <ExternalLink size={16} />
        </a>
      </div>
      <ul className="lesson-list">
        <li><Check size={16} /> Mixing walkthroughs</li>
        <li><Check size={16} /> Drums, guitars, vocals and more</li>
        <li><Check size={16} /> Plugins, routing and workflow</li>
        <li><Check size={16} /> Make your mixes hit harder</li>
      </ul>
      <div className="channel-lockup">
        <img src={asset('mixing-made-easy-logo.jpg')} alt="MixingMadeEasy logo" />
        <strong>MixingMadeEasy</strong>
      </div>
    </section>
  );
}

function AboutStudio() {
  return (
    <section className="about-grid section-edge" id="about">
      <div>
        <p className="section-kicker">Studio</p>
        <h2>Built for loud ideas, tight sessions, and mixes that translate.</h2>
        <p>
          Mike P Studio combines hands-on production, treated recording rooms,
          and practical mixing education for artists who want a finished record
          instead of another unfinished demo.
        </p>
      </div>
      <div className="studio-spaces" aria-label="Studio spaces">
        <figure className="studio-space large">
          <img src={asset('studio-live-room.jpg')} alt="Mike P Studio live room with microphones" />
          <figcaption>
            <strong>Live room</strong>
            <span>Mic-ready tracking space for vocals, keys, guitars and reamps.</span>
          </figcaption>
        </figure>
        <figure className="studio-space">
          <img src={asset('studio-control-room.jpg')} alt="Mike P Studio control room" />
          <figcaption>
            <strong>Control room</strong>
            <span>DAW, monitors and outboard for editing and mix translation.</span>
          </figcaption>
        </figure>
        <figure className="studio-space">
          <img src={asset('producer.jpg')} alt="Michael Papaleontiou working in studio" />
          <figcaption>
            <strong>Production desk</strong>
            <span>Editing, arrangement and mix decisions in one focused room.</span>
          </figcaption>
        </figure>
      </div>
      <div className="spotify-card">
        <p>Hip Hop Tracks</p>
        <h3>Listen on Spotify</h3>
        <iframe
          className="spotify-frame"
          title="Spotify album player"
          src={links.spotifyAlbum}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <a className="outline-link" href={links.spotify} target="_blank" rel="noreferrer">
          Open Spotify <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}

function ProjectForm() {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: projectTypes[0],
    genre: '',
    timeline: '',
    message: '',
    newsletter: true,
  });

  const canSubmit = useMemo(
    () => formData.name.trim() && formData.email.trim() && formData.message.trim(),
    [formData],
  );

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function submitForm(event) {
    event.preventDefault();

    if (!canSubmit) {
      setStatus('Please add your name, email and project details.');
      return;
    }

    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project type: ${formData.projectType}`,
      `Genre: ${formData.genre || 'Not specified'}`,
      `Budget / timeline: ${formData.timeline || 'Not specified'}`,
      `Newsletter: ${formData.newsletter ? 'Yes' : 'No'}`,
      '',
      'Project details:',
      formData.message,
    ].join('\n');

    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      `New Mike P Studio project from ${formData.name}`,
    )}&body=${encodeURIComponent(body)}`;

    setStatus('Opening your email app with the project details.');
    window.location.href = href;
  }

  return (
    <section className="project-section section-edge" id="contact">
      <div className="project-steps">
        <CalendarDays size={42} />
        <div>
          <h2>Start your track</h2>
          <p>Have a song ready or need help from the start? Let&apos;s bring your sound to life.</p>
        </div>
        <ol>
          <li><span>1</span> Tell me about your project</li>
          <li><span>2</span> We schedule a call</li>
          <li><span>3</span> Make heavy music</li>
        </ol>
      </div>
      <form className="project-form" onSubmit={submitForm} noValidate>
        <div className="form-row">
          <label>
            Name
            <input name="name" value={formData.name} onChange={updateField} autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" value={formData.email} onChange={updateField} autoComplete="email" type="email" required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Project
            <select name="projectType" value={formData.projectType} onChange={updateField}>
              {projectTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Genre
            <input name="genre" value={formData.genre} onChange={updateField} placeholder="Metal, rock, hip hop..." />
          </label>
        </div>
        <label>
          Budget / timeline
          <input name="timeline" value={formData.timeline} onChange={updateField} placeholder="Mix this month / EP by summer" />
        </label>
        <label>
          Message
          <textarea name="message" value={formData.message} onChange={updateField} rows="5" required />
        </label>
        <label className="check-row">
          <input
            name="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={updateField}
          />
          Send me studio updates and mixing tips.
        </label>
        <button className="button button-primary submit-button" type="submit">
          Start your project <Send size={18} />
        </button>
        <p className="form-status" role="status">{status}</p>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-edge">
      <img src={asset('michael-logo.jpg')} alt="Michael Papaleontiou logo" />
      <div>
        <h2>Mike P Studio</h2>
        <p>Studio in Athens, Greece. Working with bands worldwide.</p>
      </div>
      <div>
        <h3>Links</h3>
        <a href={links.mikeYoutube} target="_blank" rel="noreferrer">YouTube - Mike P</a>
        <a href={links.mixingYoutube} target="_blank" rel="noreferrer">YouTube - MixingMadeEasy</a>
        <a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={links.tiktok} target="_blank" rel="noreferrer">TikTok</a>
        <a href={links.spotify} target="_blank" rel="noreferrer">Spotify</a>
      </div>
      <div>
        <h3>Contact</h3>
        <a className="email-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        <a className="button button-secondary" href="#contact">
          Book a project call <ArrowRight size={18} />
        </a>
        <SocialLinks compact />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Mixes />
        <YoutubeEducation />
        <AboutStudio />
        <ProjectForm />
      </main>
      <Footer />
    </>
  );
}
