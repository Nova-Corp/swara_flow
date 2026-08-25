const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = new URL(configuredUrl ?? "https://swara-flow.vercel.app");
export const HAS_PUBLIC_SITE_URL = SITE_URL.protocol === "https:"
  && SITE_URL.hostname !== "localhost"
  && SITE_URL.hostname !== "127.0.0.1";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
