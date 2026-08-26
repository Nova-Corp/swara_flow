"use client";

import { useEffect, useState } from "react";
import { PracticeWorkspace } from "../features/practice/components/PracticeWorkspace";
import type { Language } from "../features/i18n/language";
import { absoluteUrl } from "../lib/site";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const isTamil = language === "ta";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("swara-flow-language");
    if (savedLanguage === "ta") {
      setLanguage("ta");
      document.documentElement.lang = "ta";
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("swara-flow-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

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
        featureList: ["14 verified Sarali Varisai lessons", "Mayamalavagowla and Harikambhoji playback", "Adjustable tonic and three traditional speeds", "Flute and synthesized tone"],
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
        <nav className="topnav" aria-label={isTamil ? "முதன்மை வழிசெலுத்தல்" : "Primary navigation"}>
          <a href="#practice">{isTamil ? "பயிற்சி" : "Practice"}</a>
          <a href="#about">{isTamil ? "அறிமுகம்" : "About"}</a>
        </nav>
        <div className="languageSelector" role="group" aria-label={isTamil ? "மொழியைத் தேர்ந்தெடுக்கவும்" : "Choose language"}>
          <button className={language === "en" ? "active" : ""} type="button" aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>English</button>
          <button className={language === "ta" ? "active" : ""} type="button" aria-pressed={language === "ta"} onClick={() => changeLanguage("ta")}>தமிழ்</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> {isTamil ? "தொடக்கநிலையினருக்கான கர்நாடக இசைப் பயிற்சி" : "Carnatic music practice for beginners"}</p>
          <h1>{isTamil ? <>ஒவ்வொரு <em>ஸ்வரத்தையும்</em> உணருங்கள்.<br />உங்கள் ஓட்டத்தைக் கண்டறியுங்கள்.</> : <>Feel every <em>swara.</em><br />Find your flow.</>}</h1>
          <p className="intro">{isTamil ? "தினசரி கர்நாடக இசைப் பயிற்சியின் மூலம் சுருதி, தெளிவு மற்றும் தன்னம்பிக்கையை வளர்க்கும் அமைதியான இடம்." : "A quiet, focused space to build shruti, clarity and confidence through everyday Carnatic practice."}</p>
          <div className="heroActions">
            <a className="primaryAction" href="#practice-workspace">{isTamil ? "பயிற்சியைத் தொடங்குங்கள்" : "Begin practice"} <span aria-hidden="true">↓</span></a>
            <p><strong>14</strong> {isTamil ? "சரிபார்க்கப்பட்ட பாடங்கள்" : "verified lessons"} <i /> <strong>2</strong> {isTamil ? "இசைக்கருவிகள்" : "instruments"}</p>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="orbit orbitOuter"><span>Sa</span></div>
          <div className="orbit orbitMiddle"><span>pa</span></div>
          <div className="soundCore">
            <i /><i /><i /><i /><i /><i /><i />
            <strong>Sa</strong>
            <small>{isTamil ? "தொடக்கம்" : "the beginning"}</small>
          </div>
          <span className="floatingNote noteOne">R₁</span>
          <span className="floatingNote noteTwo">M₁</span>
          <span className="floatingNote noteThree">N₃</span>
        </div>
      </section>

      <section className="practiceSection" id="practice">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow"><span aria-hidden="true">02</span> {isTamil ? "பயிற்சி அறை" : "Practice room"}</p>
            <h2>{isTamil ? <>இன்றைய <em>பயிற்சி</em></> : <>Today’s <em>Practice</em></>}</h2>
          </div>
          <p>{isTamil ? "ஒரு வடிவத்தைத் தேர்ந்தெடுத்து, உங்கள் ச-வை அமைத்து, அடுத்த ஸ்வரத்திற்குச் செல்லும் முன் ஒவ்வொரு ஸ்வரத்தையும் நிலைநிறுத்துங்கள்." : "Choose a pattern, set your Sa, and let each note settle before moving forward."}</p>
        </div>
        <PracticeWorkspace language={language} />
      </section>

      <section className="philosophy" id="about">
        <p className="eyebrow"><span aria-hidden="true">✦</span> {isTamil ? "மென்மையான கற்றல் முறை" : "A gentler way to learn"}</p>
        <blockquote>{isTamil ? <>பயிற்சி என்பது திரும்பச் செய்வது அல்ல.<br />அது <em>ஆழ்ந்து கேட்பது.</em></> : <>Practice is not repetition.<br />It is <em>deep listening.</em></>}</blockquote>
        <div className="philosophyNotes">
          <span>{isTamil ? "ஸ்வரத்தைக் கேளுங்கள்" : "Hear the swara"}</span><i /><span>{isTamil ? "சொற்றொடரைப் பின்பற்றுங்கள்" : "Follow the phrase"}</span><i /><span>{isTamil ? "உங்கள் வேகத்தில் வளருங்கள்" : "Grow at your pace"}</span>
        </div>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top"><span className="brandMark" aria-hidden="true"><i />S</span><span className="brandName">swara <em>flow</em></span></a>
        <p>{isTamil ? "கர்நாடக இசை கற்பவர்களுக்காக பொறுமையுடன் உருவாக்கப்பட்டது." : "Made with patience for Carnatic learners."}</p>
        <p>{isTamil ? "இலவசம் மற்றும் திறந்த மூலம் · 2026" : "Free & open source · 2026"}</p>
      </footer>
    </main>
  );
}
