/* Minimale ontwikkelserver voor de statische site in app/.
   Geen npm-pakketten nodig — alleen Node zelf.

   Gebruik:  node scripts/dev-server.mjs [poort]
   Standaard: http://localhost:8123
*/

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const poort = Number(process.argv[2]) || 8123;
const wortel = resolve(fileURLToPath(new URL("../app", import.meta.url)));

const typen = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon"
};

createServer(async (verzoek, antwoord) => {
  const pad = decodeURIComponent(new URL(verzoek.url, "http://localhost").pathname);
  const doel = join(wortel, normalize(pad).replace(/^(\.\.[/\\])+/, ""));

  // Nooit buiten app/ serveren, ook niet via ../ in de URL.
  if (!doel.startsWith(wortel)) {
    antwoord.writeHead(403).end("403 — verboden");
    return;
  }

  const bestand = pad.endsWith("/") ? join(doel, "index.html") : doel;

  try {
    const inhoud = await readFile(bestand);
    antwoord.writeHead(200, {
      "Content-Type": typen[extname(bestand).toLowerCase()] ?? "application/octet-stream",
      "Cache-Control": "no-store"
    });
    antwoord.end(inhoud);
  } catch {
    antwoord.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    antwoord.end("<h1>404</h1><p>Niet gevonden: " + pad + "</p>");
  }
}).listen(poort, () => {
  console.log("Hevanti draait op http://localhost:" + poort);
});
