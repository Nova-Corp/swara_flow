import { PracticeWorkspace } from "../features/practice/components/PracticeWorkspace";
import { absoluteUrl } from "../lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "Swara Flow",
        description: "Free online Carnatic music practice for beginners.",
        inLanguage: "en-IN",
      },
      {
        "@type": "SoftwareApplication",
        "@id": absoluteUrl("/#application"),
        name: "Swara Flow",
        url: absoluteUrl("/"),
        image: absoluteUrl("/og.png"),
        description: "An interactive practice room with 14 verified Sarali Varisai lessons in Mayamalavagowla and Harikambhoji.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser with Web Audio support.",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["14 verified Sarali Varisai lessons", "Mayamalavagowla and Harikambhoji playback", "Adjustable tonic and tempo", "Flute and synthesized tone"],
      },
    ],
  };

  return (
    <main className="shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Swara Flow home">
          <span className="brandMark" aria-hidden="true"><i />S</span>
          <span className="brandName">swara <em>flow</em></span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a href="#practice">Practice</a>
          <a href="#about">About</a>
        </nav>
        <span className="openSource"><i aria-hidden="true" /> Free &amp; open source</span>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Carnatic music practice for beginners</p>
          <h1>Feel every <em>swara.</em><br />Find your flow.</h1>
          <p className="intro">A quiet, focused space to build shruti, clarity and confidence through everyday Carnatic practice.</p>
          <div className="heroActions">
            <a className="primaryAction" href="#practice">Begin practice <span aria-hidden="true">↓</span></a>
            <p><strong>14</strong> verified lessons <i /> <strong>2</strong> instruments</p>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="orbit orbitOuter"><span>Sa</span></div>
          <div className="orbit orbitMiddle"><span>pa</span></div>
          <div className="soundCore">
            <i /><i /><i /><i /><i /><i /><i />
            <strong>Sa</strong>
            <small>the beginning</small>
          </div>
          <span className="floatingNote noteOne">R₁</span>
          <span className="floatingNote noteTwo">M₁</span>
          <span className="floatingNote noteThree">N₃</span>
        </div>
      </section>

      <section className="practiceSection" id="practice">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow"><span aria-hidden="true">02</span> Practice room</p>
            <h2>Today’s <em>riyaz</em></h2>
          </div>
          <p>Choose a pattern, set your Sa, and let each note settle before moving forward.</p>
        </div>
        <PracticeWorkspace />
      </section>

      <section className="philosophy" id="about">
        <p className="eyebrow"><span aria-hidden="true">✦</span> A gentler way to learn</p>
        <blockquote>Practice is not repetition.<br />It is <em>deep listening.</em></blockquote>
        <div className="philosophyNotes">
          <span>Hear the swara</span><i /><span>Follow the phrase</span><i /><span>Grow at your pace</span>
        </div>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top"><span className="brandMark" aria-hidden="true"><i />S</span><span className="brandName">swara <em>flow</em></span></a>
        <p>Made with patience for Carnatic learners.</p>
        <p>Free &amp; open source · 2026</p>
      </footer>
    </main>
  );
}
