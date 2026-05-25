/**
 * Префикс basePath для статических ассетов в production.
 * GH Pages раздаёт по /marafet-landing-partnerka/. В dev — пустой.
 */
const isProd = process.env.NODE_ENV === "production";
const BASE_PATH = isProd ? "/marafet-landing-partnerka" : "";

/** Преобразует /logo.svg → /marafet-landing-partnerka/logo.svg в проде */
export function assetPath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/** Экосистема: 3 лендинга */
export const MARAFET_APP_URL = "https://bulkhinaa.github.io/marafet-landing/";
export const PROSTRANSTVA_URL =
  "https://bulkhinaa.github.io/marafet-landing-prostranstva/";
