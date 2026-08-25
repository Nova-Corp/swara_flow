import { PracticeWorkspace } from "../features/practice/components/PracticeWorkspace";

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Swara Flow home">
          <span className="brandMark" aria-hidden="true">S</span>
          <span>swara flow</span>
        </a>
        <span className="openSource">open-source practice room</span>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Carnatic practice, made visible</p>
          <h1>Find your flow.<br />One swara at a time.</h1>
          <p className="intro">Build clarity, breath and speed with guided exercises made for everyday Carnatic practice.</p>
        </div>
        <div className="heroGlyph" aria-hidden="true">
          <span>S</span><i /><span>R</span><i /><span>G</span><i /><span>M</span>
        </div>
      </section>

      <PracticeWorkspace />

      <footer>
        <p>Made for patient practice.</p>
        <p>Swara Flow · Free and open source</p>
      </footer>
    </main>
  );
}
