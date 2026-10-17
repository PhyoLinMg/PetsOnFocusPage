import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import catSit from "@/assets/pets/cat_sit.webp";
import catSleep from "@/assets/pets/cat_sleep.webp";
import catCelebrating from "@/assets/pets/cat_celebrating.webp";

// The pet's room, redrawn from the app's screenshots (redesign hand-off, 2026-10-15). Every object is
// placed by its box in the 1080 x 2400 phone screenshot; on a wider wall its centre spreads out from the
// middle (globals.css, .room-o). The side walls were shot 150 px lower than the front, so their boxes are
// shifted up to meet the front wall's floor line.

const box = (x: number, y: number, w: number, h: number) =>
  ({ "--x": x, "--y": y, "--w": w, "--h": h }) as CSSProperties;

// Side-wall items are drawn with an ink outline over a fill printed slightly off register, as in the app.
// Inside, class "solid" marks shapes filled with ink, "line" and "hatch" marks strokes only.
function Inked({ x, y, w, h, rotate, children }: { x: number; y: number; w: number; h: number; rotate?: string; children: ReactNode }) {
  return (
    <div className="room-o room-inked" style={box(x, y, w, h)}>
      <svg viewBox={`0 0 ${w} ${h}`}>
        <g className="room-fill-pass" transform={`translate(6 5)${rotate ? ` ${rotate}` : ""}`}>
          {children}
        </g>
        <g className="room-ink-pass" transform={rotate}>
          {children}
        </g>
      </svg>
    </div>
  );
}

/** A floor label under an object, centred on phone x `cx`. */
function Label({ cx, y, children }: { cx: number; y: number; children: ReactNode }) {
  return (
    <div className="room-label" style={{ "--cx": cx, "--y": y } as CSSProperties}>
      {children}
    </div>
  );
}

const PENNANTS = [1, 3, 7, 14, 30, 60, 100];

function LeftWall() {
  return (
    <>
      <svg className="room-o" style={box(0, 60, 1080, 120)} viewBox="0 0 1080 120" preserveAspectRatio="none">
        <path className="room-rope" d="M20 15 Q540 125 1060 15" fill="none" stroke="#c9a978" vectorEffect="non-scaling-stroke" />
      </svg>
      {PENNANTS.map((n, i) => {
        const cx = 95 + i * 148;
        const top = 70 + 52 * (1 - ((cx - 540) / 540) ** 2);
        return (
          <Inked key={n} x={cx - 44} y={top} w={88} h={96} rotate={`rotate(${i % 2 ? 4 : -5} 44 40)`}>
            <path d="M4 6 L84 10 L44 92 Z" fill={i === 0 ? "#f2c4a6" : "#f2efe0"} />
            <text className="solid room-pennant-text" x="44" y="46" textAnchor="middle" fontSize={n > 99 ? 24 : n > 9 ? 28 : 30}>
              {n}
            </text>
          </Inked>
        );
      })}

      <div className="room-o room-board" style={box(63, 443, 595, 430)}>
        <div className="room-board-row">
          <span className="room-board-today">Today</span>
          <span className="room-board-week">this week</span>
        </div>
        <div className="room-board-big">1</div>
        <div className="room-board-mins">25 min</div>
        <div className="room-board-sess">sessions</div>
        <div className="room-bars">
          {["F", "S", "S", "M", "T", "W"].map((d, i) => (
            <i key={i}>{d}</i>
          ))}
          <i className="on">T</i>
        </div>
      </div>

      <div className="room-o room-cal" style={box(713, 507, 311, 370)}>
        <span className="room-cal-pin" />
        <div className="room-cal-head">streak</div>
        <div className="room-cal-n">1</div>
        <div className="room-cal-lbl">days in a row</div>
        <div className="room-cal-dots">
          {Array.from({ length: 7 }, (_, i) => (
            <b key={i} />
          ))}
        </div>
      </div>

      <Inked x={293} y={1040} w={385} h={195}>
        <rect x="42" y="2" width="36" height="106" fill="#c95f45" />
        <path className="line" d="M42 22 H78 M42 88 H78" />
        <rect x="82" y="24" width="30" height="84" fill="#7f9fbd" />
        <path className="line" d="M82 40 H112" />
        <path d="M120 106 L148 2 L176 10 L150 108 Z" fill="#e9c24e" />
        <rect x="186" y="34" width="30" height="74" fill="#5f9150" />
        <path className="line" d="M186 52 H216" />
        <path d="M252 66 L312 66 L304 108 L260 108 Z" fill="#c8704d" />
        <path d="M282 64 C262 40 262 18 270 4 C286 22 292 44 282 64 Z" fill="#5f9150" />
        <path d="M284 62 C298 40 316 32 334 32 C326 52 306 62 284 62 Z" fill="#5f9150" />
        <rect x="2" y="108" width="383" height="28" rx="3" fill="#8b6340" />
        <path d="M34 136 L80 136 L34 186 Z" fill="#6e4b30" />
        <path d="M353 136 L307 136 L353 186 Z" fill="#6e4b30" />
        <path className="hatch" d="M30 120 H160 M220 120 H360" />
      </Inked>

      <Inked x={150} y={1358} w={335} h={262}>
        <path d="M34 128 V40 C34 14 50 4 82 4 H252 C284 4 300 14 300 40 V128 Z" fill="#6e89a6" />
        <rect x="70" y="158" width="196" height="64" fill="#93abc2" />
        <path d="M2 116 C2 96 14 90 38 90 C62 90 76 96 76 116 V240 H2 Z" fill="#7f9ab6" />
        <path d="M259 116 C259 96 273 90 297 90 C321 90 333 96 333 116 V240 H259 Z" fill="#7f9ab6" />
        <path className="line" d="M76 222 H259" />
        <path className="line" d="M20 240 V258 M315 240 V258" />
        <circle className="solid" cx="128" cy="68" r="8" />
        <circle className="solid" cx="206" cy="68" r="8" />
        <circle className="solid" cx="167" cy="104" r="8" />
        <path
          className="hatch"
          d="M100 32 C150 22 200 22 236 32 M14 170 L32 152 M14 200 L32 182 M300 170 L318 152 M300 200 L318 182 M100 200 L118 184 M218 200 L236 184"
        />
      </Inked>

      <Inked x={698} y={1462} w={228} h={152}>
        <path d="M114 30 C92 2 62 8 64 22 C66 34 96 34 114 30 Z" fill="#f1eede" />
        <path d="M114 30 C136 2 166 8 164 22 C162 34 132 34 114 30 Z" fill="#f1eede" />
        <rect x="16" y="56" width="196" height="96" fill="#e08f50" />
        <rect x="2" y="30" width="224" height="30" fill="#c8793e" />
        <rect x="100" y="30" width="28" height="122" fill="#f1eede" />
        <path className="line" d="M114 30 L100 56 M114 30 L128 56" />
        <circle className="solid room-dot" cx="52" cy="84" r="7" />
        <circle className="solid room-dot" cx="176" cy="84" r="7" />
        <circle className="solid room-dot" cx="70" cy="128" r="7" />
        <circle className="solid room-dot" cx="160" cy="130" r="7" />
      </Inked>
      <Label cx={812} y={1648}>
        Collect
      </Label>
    </>
  );
}

function Paw() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <g fill="currentColor">
        <path d="M22 38 C14 38 10 34 11 29 C12 24 17 21 22 21 C27 21 32 24 33 29 C34 34 30 38 22 38 Z" />
        <ellipse cx="9" cy="18" rx="4.6" ry="5.8" transform="rotate(-18 9 18)" />
        <ellipse cx="17" cy="10" rx="4.8" ry="6.2" transform="rotate(-6 17 10)" />
        <ellipse cx="27.5" cy="10" rx="4.8" ry="6" transform="rotate(8 27.5 10)" />
        <ellipse cx="35.5" cy="18.5" rx="4.4" ry="5.8" transform="rotate(20 35.5 18.5)" />
      </g>
    </svg>
  );
}

function Pin() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5 L29 5 M18 6 L17 18 C11 21 10 25 10 27 L34 27 C34 25 32 21 27 18 L26 6" />
        <path d="M22 28 L21 40" />
      </g>
    </svg>
  );
}

/** The front wall. With `still`, the pet only sits, as that one picture (the device frames use this). */
export function FrontWall({ still }: { still?: StaticImageData }) {
  return (
    <>
      <div className="room-sounds" data-part="sounds">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M5 15 L13 14 L22 6 C23 15 23 26 22 34 L13 26 L5 25 Z" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M28 14 C31 17 31 23 28 26 M32 10 C37 15 37 25 32 30" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
        Sounds
      </div>
      <div className="room-timer" data-part="timer">
        25:00
      </div>
      <div className="room-task">
        <div className="room-task-paper">
          <Paw />
          Ready for your first focus?
          <div className="room-task-alt" data-part="task-alt">
            <Pin />
            Finish the essay draft
          </div>
        </div>
      </div>
      <div className="room-toggle" data-part="toggle">
        <span>Single focus</span>
        <span>Pomodoro</span>
      </div>

      <div className="room-o" style={box(96, 918, 316, 345)}>
        <div className="room-sky">
          <span className="room-sky-eve" data-part="eve" />
          <span className="room-sky-sun" />
          <span className="room-sky-cloud" />
          <span className="room-sky-hill" />
          <span className="room-sky-hill2" />
          <span className="room-sky-glare" />
        </div>
        <svg viewBox="0 0 316 345" className="room-fill">
          <rect x="44" y="24" width="258" height="206" fill="none" stroke="#6f8f72" strokeWidth="30" />
          <rect x="166" y="40" width="12" height="180" fill="#6f8f72" />
          <rect x="60" y="126" width="230" height="10" fill="#6f8f72" />
          <rect x="59" y="39" width="20" height="181" fill="#4e6a51" opacity=".55" />
          <rect x="0" y="2" width="316" height="10" rx="5" fill="#6c6553" />
          <circle cx="6" cy="7" r="9" fill="#6c6553" />
          <path d="M2 12 H44 V342 H4 C14 260 6 140 2 12 Z" fill="#e3dcc6" />
          <path d="M26 14 C34 120 30 240 32 342" stroke="#d3c9ad" strokeWidth="5" fill="none" />
          <path d="M314 12 H272 V342 H312 C302 260 310 140 314 12 Z" fill="#e3dcc6" />
          <path d="M290 14 C282 120 286 240 284 342" stroke="#d3c9ad" strokeWidth="5" fill="none" />
          <path d="M74 214 V196 M114 214 V196 M154 214 V196 M194 214 V196 M234 214 V196" stroke="#4c8a59" strokeWidth="5" />
          <circle cx="74" cy="190" r="10" fill="#e07070" />
          <circle cx="74" cy="190" r="4" fill="#b45a57" />
          <circle cx="114" cy="186" r="10" fill="#e9c24e" />
          <circle cx="114" cy="186" r="4" fill="#b9902e" />
          <circle cx="154" cy="190" r="10" fill="#e07070" />
          <circle cx="154" cy="190" r="4" fill="#b45a57" />
          <circle cx="194" cy="186" r="10" fill="#f4f2e8" />
          <circle cx="194" cy="186" r="4" fill="#9a9a90" />
          <circle cx="234" cy="190" r="10" fill="#e9c24e" />
          <circle cx="234" cy="190" r="4" fill="#b9902e" />
          <path d="M30 228 L286 228 L280 290 L36 290 Z" fill="#ac7059" />
          <rect x="30" y="226" width="256" height="12" fill="#bb8068" />
          <path d="M60 262 H256" stroke="#8d5844" strokeWidth="5" />
          <rect x="32" y="290" width="252" height="34" fill="#f0f1de" />
          <rect x="32" y="314" width="252" height="10" fill="#d8d8c4" />
        </svg>
      </div>

      <svg className="room-o" style={box(730, 983, 152, 203)} viewBox="0 0 152 203">
        <path d="M0 6 L14 0 L14 203 L0 196 Z" fill="#2e2015" />
        <rect x="12" y="0" width="140" height="203" rx="5" fill="#4f3a28" />
        <rect x="28" y="16" width="108" height="170" fill="#f0ece0" />
        <rect x="38" y="28" width="88" height="148" fill="#9ccfcd" />
        <rect x="38" y="80" width="88" height="70" fill="#7dbec9" />
        <path d="M38 152 C70 140 100 146 126 150 V176 H38 Z" fill="#dcc79c" />
        <path d="M60 176 C50 150 66 130 56 106" stroke="#4c8a59" strokeWidth="5" fill="none" />
        <path d="M70 176 C76 160 66 150 72 136" stroke="#4c8a59" strokeWidth="4" fill="none" />
        <ellipse cx="88" cy="90" rx="24" ry="15" fill="#ee8a3c" />
        <path d="M108 90 L126 76 L124 104 Z" fill="#f2a55c" />
        <circle cx="74" cy="86" r="3.5" fill="#2a1d14" />
        <path d="M44 48 C58 44 70 52 86 46" stroke="#fff" strokeWidth="3" fill="none" opacity=".7" />
        <circle cx="82" cy="64" r="4" fill="none" stroke="#fff" strokeWidth="2" />
        <ellipse cx="102" cy="164" rx="6" ry="3" fill="#fff" />
      </svg>

      <svg className="room-o" style={box(908, 1214, 92, 394)} viewBox="0 0 92 394">
        <rect x="41" y="150" width="10" height="226" fill="#5f4b3a" />
        <ellipse cx="46" cy="380" rx="44" ry="13" fill="#8b8668" />
        <path d="M28 2 L64 2 L82 150 L10 150 Z" fill="#d8ad54" />
        <path d="M46 2 L64 2 L82 150 L50 150 Z" fill="#c29a3f" />
        <ellipse cx="46" cy="150" rx="36" ry="8" fill="#967943" />
      </svg>

      <svg className="room-o" style={box(196, 1296, 150, 310)} viewBox="0 0 150 310">
        <g fill="none" strokeLinecap="round">
          <g stroke="#5f8950" strokeWidth="18">
            <path d="M74 200 C70 140 66 80 66 10" />
            <path d="M74 200 C78 140 84 70 92 12" />
            <path d="M72 200 C50 150 24 110 14 74" />
            <path d="M78 200 C100 150 126 120 140 96" />
            <path d="M70 200 C52 160 40 120 38 70" />
            <path d="M80 200 C96 160 112 120 118 50" />
          </g>
          <g stroke="#7fa56a" strokeWidth="5">
            <path d="M74 196 C70 140 66 80 66 16" />
            <path d="M74 196 C78 140 84 70 92 18" />
            <path d="M72 196 C50 150 24 110 16 80" />
            <path d="M78 196 C100 150 126 120 136 100" />
            <path d="M70 196 C52 160 40 120 38 76" />
            <path d="M80 196 C96 160 112 120 118 56" />
          </g>
        </g>
        <ellipse cx="75" cy="212" rx="50" ry="12" fill="#b5603d" />
        <path d="M26 212 L124 212 L114 306 L36 306 Z" fill="#b5603d" />
        <path d="M84 212 L124 212 L114 306 L92 306 Z" fill="#9d4f33" />
        <ellipse cx="75" cy="210" rx="40" ry="8" fill="#4a2f20" />
      </svg>

      <div className="room-glow" data-part="glow" />

      <svg className="room-o" style={box(147, 1640, 786, 196)} viewBox="0 0 786 196">
        <ellipse cx="393" cy="98" rx="393" ry="96" fill="#a5674e" />
        <ellipse cx="393" cy="96" rx="360" ry="80" fill="none" stroke="#c38a6f" strokeWidth="8" />
        <ellipse cx="393" cy="96" rx="330" ry="66" fill="none" stroke="#8c5440" strokeWidth="5" strokeDasharray="26 18" />
        <ellipse cx="393" cy="118" rx="240" ry="56" fill="#5f7489" />
        <ellipse cx="393" cy="102" rx="240" ry="54" fill="#8ca1b5" />
        <path
          d="M215 86 L230 116 M300 64 L306 98 M393 58 L393 94 M486 64 L480 98 M571 86 L556 116 M240 136 L262 116 M546 136 L524 116"
          stroke="#6f859b"
          strokeWidth="4"
        />
        <ellipse cx="393" cy="98" rx="140" ry="28" fill="#5f7489" />
        <ellipse cx="393" cy="102" rx="128" ry="24" fill="#efe6d2" />
      </svg>

      <div className="room-pet">
        {still ? (
          <Image className="room-pet--still" src={still} alt="" sizes="320px" />
        ) : (
          <>
            <Image data-pose="sit" src={catSit} alt="" sizes="640px" loading="eager" fetchPriority="high" />
            <Image data-pose="sleep" className="room-pet--sleep" src={catSleep} alt="" sizes="640px" loading="eager" />
            <Image data-pose="celebrating" className="room-pet--celebrating" src={catCelebrating} alt="" sizes="640px" loading="eager" />
          </>
        )}
      </div>

      <div className="room-start" data-part="start">
        Start
      </div>

      <div className="room-sheet" data-part="sheet">
        <div className="room-sheet-title">Bramble brought you a gift!</div>
        <svg className="room-sheet-find" viewBox="0 0 210 150" aria-hidden="true">
          <ellipse cx="105" cy="84" rx="50" ry="32" fill="#9aa3a8" />
          <ellipse cx="96" cy="74" rx="26" ry="12" fill="#b9c0c4" />
          <g stroke="#bdbab0" strokeWidth="6" strokeLinecap="round">
            <path d="M54 30 L66 44" />
            <path d="M156 30 L144 44" />
            <path d="M40 118 L56 110" />
            <path d="M170 118 L154 110" />
            <path d="M105 10 L105 26" />
          </g>
        </svg>
        <span className="room-chip">Common</span>
        <div className="room-sheet-name">Smooth Pebble</div>
        <p className="room-sheet-desc">Not much, but it&rsquo;s honest work.</p>
        <div className="room-sheet-quote">&ldquo;A gift. Be grateful.&rdquo; &mdash; Bramble</div>
        <div className="room-sheet-tile">
          <small>Focused</small>
          <b>25 min</b>
        </div>
        <div className="room-sheet-go">Let&rsquo;s go</div>
        <div className="room-sheet-share">Share with friends</div>
      </div>
    </>
  );
}

function RightWall() {
  return (
    <>
      <Inked x={176} y={676} w={282} h={298} rotate="rotate(-1.5 141 149)">
        <rect x="12" y="20" width="262" height="276" fill="#f4efd8" />
        <path className="line thin" d="M30 34 L256 30 L258 270 M30 270 L250 268" />
        <path d="M60 236 C40 236 44 196 70 186 L64 150 L90 170 C120 140 200 128 236 162 C262 190 252 236 216 238 Z" fill="#e8a46c" />
        <path className="line" d="M96 238 H220 C238 238 246 226 244 212" />
        <path className="hatch" d="M140 214 L156 198 M162 214 L178 198 M184 214 L200 198 M206 214 L220 200" />
        <path className="line" d="M168 166 C176 180 176 194 172 204 M196 160 C204 176 204 190 200 200 M222 176 C228 186 228 196 224 204" />
        <path className="line" d="M80 206 C86 210 92 210 96 206 M104 204 C108 208 114 208 118 204" />
        <circle className="solid" cx="100" cy="222" r="4" />
        <path className="line" d="M164 70 L184 70 L164 94 L186 94 M196 46 L208 46 L196 60 L210 60" />
        <rect className="solid room-tape" x="-6" y="0" width="64" height="28" transform="rotate(-24 26 14)" />
        <rect className="solid room-tape" x="230" y="0" width="64" height="28" transform="rotate(22 262 14)" />
      </Inked>

      <svg className="room-o" style={box(632, 704, 264, 40)} viewBox="0 0 264 40">
        <path d="M8 12 C80 36 184 36 256 12" fill="none" stroke="#6b4a33" strokeWidth="5" />
        <circle cx="8" cy="12" r="9" fill="#6b4a33" />
        <circle cx="256" cy="12" r="9" fill="#6b4a33" />
      </svg>
      <div className="room-o room-plan" style={box(680, 735, 168, 200)}>
        <b>Free</b>
        <span>plan</span>
      </div>

      {/* The coin jar shows coins but never a balance (owner, 2026-10-15). */}
      <svg className="room-o" style={box(152, 1380, 192, 250)} viewBox="0 0 192 250">
        <rect x="34" y="0" width="124" height="34" rx="6" fill="#8b6a4e" />
        <path d="M18 34 H174 C186 34 192 50 192 70 V236 C192 246 184 250 174 250 H18 C8 250 0 246 0 236 V70 C0 50 6 34 18 34 Z" fill="#dae3e0" />
        <g fill="#e6c352" stroke="#c9a53a" strokeWidth="3">
          {[232, 208, 184].map((cy) =>
            [50, 96, 142].map((cx) => <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="28" ry="11" />),
          )}
        </g>
        <rect x="22" y="60" width="18" height="90" rx="9" fill="#fff" opacity=".5" />
      </svg>
      <Label cx={248} y={1648}>
        Coins
      </Label>

      <Inked x={405} y={1284} w={268} h={362}>
        <path d="M10 6 H136 C130 48 108 62 74 62 C40 62 16 48 10 6 Z" fill="#b9845e" />
        <rect x="2" y="66" width="148" height="30" fill="#c49a6c" />
        <rect x="54" y="96" width="38" height="252" fill="#dcc39a" />
        <path className="hatch" d="M54 120 L92 108 M54 150 L92 138 M54 180 L92 168 M54 210 L92 198 M54 240 L92 228 M54 270 L92 258 M54 300 L92 288 M54 330 L92 318" />
        <rect x="130" y="176" width="136" height="28" fill="#c49a6c" />
        <rect x="182" y="204" width="34" height="144" fill="#dcc39a" />
        <path className="hatch" d="M182 230 L216 218 M182 260 L216 248 M182 290 L216 278 M182 320 L216 308" />
        <path className="line thin" d="M250 204 V268" />
        <circle cx="250" cy="282" r="14" fill="#c9553e" />
        <rect x="4" y="342" width="258" height="18" fill="#c49a6c" />
      </Inked>

      <Inked x={762} y={1484} w={218} h={160}>
        <path className="line" d="M68 50 V18 H150 V50" />
        <path className="line thin" d="M80 50 V30 H140 V50" />
        <path className="line" d="M30 4 C22 14 26 22 34 22 L52 52" />
        <rect x="4" y="50" width="210" height="108" fill="#b5513c" />
        <path className="line" d="M4 80 H214" />
        <rect x="94" y="66" width="30" height="30" fill="#e6c352" />
        <circle className="solid" cx="109" cy="81" r="5" />
        <path className="hatch" d="M24 108 H72 M30 140 L46 124 M168 140 L184 124" />
      </Inked>
      <Label cx={870} y={1672}>
        Settings
      </Label>
    </>
  );
}

const CONTENT = [LeftWall, () => <FrontWall />, RightWall];
const NAMES = ["left", "front", "right"] as const;

/**
 * One wall of the room: paint, then its things. It is drawn as two half-panels, each a full copy clipped
 * to its half, so RoomTour can hide a half that has turned out of view. A surface reaching the camera
 * plane is misprojected by the browser; a visible half never gets that far.
 */
export function Wall({ index }: { index: 0 | 1 | 2 }) {
  const Content = CONTENT[index];
  const half = (side: "a" | "b") => (
    <div className={`room-half room-half--${side}`}>
      <div className="room-half-inner">
        <div className="room-paint-wall" />
        <div className="room-baseboard" />
        <div className="room-paint-floor" />
        <div className="room-layer">
          <Content />
        </div>
        {index === 1 && <div className="room-dim" data-part="dim" />}
        <div className="room-shade" data-part="shade" />
      </div>
    </div>
  );
  return (
    <section className={`room-wall room-wall--${NAMES[index]}`}>
      {half("a")}
      {half("b")}
    </section>
  );
}
