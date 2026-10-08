import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Served as /og.png (a real file name, so GitHub Pages sends image/png). Wired up in app/layout.tsx.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const WALL = "#C0C39F";
const FLOOR = "#3E6C3F";
const INK = "#2C3F29";
const PAPER = "#F2EFE0";

// Satori needs TTF/OTF; Google Fonts serves TTF when the request has no browser user agent.
async function loadShantell(text: string): Promise<ArrayBuffer> {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@700&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Could not load Shantell Sans for the Open Graph image");
  return (await fetch(url)).arrayBuffer();
}

export async function GET() {
  const wordmark = "Pets on Focus";
  const tagline = "Focus together.";
  const cat = await readFile(path.join(process.cwd(), "assets", "og-cat.png"));
  const catSrc = `data:image/png;base64,${cat.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: WALL }}>
        {/* floor */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: FLOOR }} />
        {/* window */}
        <div
          style={{
            position: "absolute",
            right: 390,
            top: 64,
            width: 150,
            height: 186,
            background: PAPER,
            display: "flex",
            padding: 12,
          }}
        >
          <div style={{ flex: 1, background: "#A9CBD3", display: "flex", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: 22,
                top: 22,
                width: 44,
                height: 44,
                borderRadius: 44,
                background: "#F2D27A",
              }}
            />
          </div>
        </div>
        {/* rug */}
        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: 40,
            width: 400,
            height: 96,
            borderRadius: "50%",
            background: "#B5704F",
          }}
        />
        <img src={catSrc} width={250} height={415} style={{ position: "absolute", right: 145, bottom: 70 }} alt="" />
        {/* wordmark on the wall */}
        <div style={{ position: "absolute", left: 80, top: 176, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Shantell", fontSize: 80, color: INK, lineHeight: 1.05 }}>{wordmark}</div>
          <div style={{ fontFamily: "Shantell", fontSize: 40, color: INK, marginTop: 18 }}>{tagline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Shantell", data: await loadShantell(wordmark + tagline), weight: 700, style: "normal" }],
    },
  );
}
