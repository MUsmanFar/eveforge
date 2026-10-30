/** Canonical production site URL (no trailing slash). */
export const DEFAULT_SITE_URL = "https://ever-forge.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || DEFAULT_SITE_URL;
}
