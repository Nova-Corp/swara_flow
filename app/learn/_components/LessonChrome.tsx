import Link from "next/link";
import type { ReactNode } from "react";
import { GitHubHeaderLink } from "../../_components/GitHubHeaderLink";

export function LessonChrome({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="lessonShell">
      <header className="lessonTopbar">
        <Link className="brand" href="/" aria-label="Swara Flow home">
          <span className="brandMark" aria-hidden="true"><i />S</span>
          <span className="brandName">swara <em>flow</em></span>
        </Link>
        <div className="headerControls lessonHeaderControls">
          <nav className="topnav lessonNav" aria-label="Lesson navigation">
            <Link href="/#practice">Practice</Link>
            <Link href="/learn/sarali-varisai" aria-current="page">Lessons</Link>
            <Link href="/#about">About</Link>
          </nav>
          <GitHubHeaderLink />
        </div>
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
