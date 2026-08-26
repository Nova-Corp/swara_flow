import Link from "next/link";
import type { ReactNode } from "react";

export function LessonChrome({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="lessonShell">
      <header className="lessonTopbar">
        <Link className="brand" href="/" aria-label="Swara Flow home">
          <span className="brandMark" aria-hidden="true"><i />S</span>
          <span className="brandName">swara <em>flow</em></span>
        </Link>
        <nav className="lessonNav" aria-label="Lesson navigation">
          <Link href="/">Home</Link>
          <Link href="/learn/sarali-varisai">Lessons</Link>
          <Link className="lessonNavCta" href="/#practice-workspace">Practice</Link>
        </nav>
      </header>
      {children}
      <footer className="lessonFooter">
        <Link className="brand footerBrand" href="/">
          <span className="brandMark" aria-hidden="true"><i />S</span>
          <span className="brandName">swara <em>flow</em></span>
        </Link>
        <p>A focused practice companion for Carnatic music beginners.</p>
        <Link href="/learn/sarali-varisai">Explore lessons <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}

