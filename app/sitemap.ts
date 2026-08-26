import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-26");
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1, images: [absoluteUrl("/og.png")] },
    { url: absoluteUrl("/learn/sarali-varisai"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/learn/sarali-varisai-1"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/learn/sarali-varisai-2"), lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
