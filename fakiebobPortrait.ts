// High-fidelity stylized vector illustration replicating Fakiebob's signature portrait photo:
// Person holding a cartoon character paddle in front of their face, wearing streetwear layered tee,
// with a tennis ball frozen in flight, against an atmospheric brick alleyway with hanging warm lights.

export const createFakiebobPortraitSvg = (): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
    <defs>
      <!-- Brick alley pattern -->
      <pattern id="brickPattern" width="60" height="24" patternUnits="userSpaceOnUse">
        <rect width="60" height="24" fill="#2d1c1a"/>
        <line x1="0" y1="0" x2="60" y2="0" stroke="#1c1211" stroke-width="2.5"/>
        <line x1="0" y1="12" x2="60" y2="12" stroke="#1c1211" stroke-width="2.5"/>
        <line x1="0" y1="24" x2="60" y2="24" stroke="#1c1211" stroke-width="2.5"/>
        <line x1="30" y1="0" x2="30" y2="12" stroke="#1c1211" stroke-width="2"/>
        <line x1="0" y1="12" x2="0" y2="24" stroke="#1c1211" stroke-width="2"/>
        <line x1="60" y1="12" x2="60" y2="24" stroke="#1c1211" stroke-width="2"/>
      </pattern>

      <!-- Warm ambient glow gradient -->
      <radialGradient id="lightGlow" cx="50%" cy="15%" r="60%">
        <stop offset="0%" stop-color="#ffb703" stop-opacity="0.25"/>
        <stop offset="50%" stop-color="#b03040" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#09090b" stop-opacity="0.8"/>
      </radialGradient>

      <!-- Halftone pattern -->
      <pattern id="dotScreen" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.5" fill="#000000" opacity="0.3"/>
      </pattern>
    </defs>

    <!-- Background: Deep Brick Alleyway -->
    <rect width="600" height="750" fill="#1b1212"/>
    <rect width="600" height="750" fill="url(#brickPattern)" opacity="0.75"/>
    <rect width="600" height="750" fill="url(#lightGlow)"/>

    <!-- Hanging Garland String Lights across alley -->
    <path d="M-20,70 Q160,110 320,85 T620,60" fill="none" stroke="#222" stroke-width="2.5"/>
    <path d="M-20,115 Q140,150 300,125 T620,100" fill="none" stroke="#222" stroke-width="2"/>

    <!-- Light Bulbs (warm glowing dots) -->
    <g>
      <circle cx="40" cy="85" r="7" fill="#ffe066" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="110" cy="100" r="6" fill="#ffe066" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="180" cy="105" r="8" fill="#ffe066" filter="drop-shadow(0 0 8px #ffbe0b)"/>
      <circle cx="260" cy="98" r="6" fill="#ffe066" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="340" cy="85" r="7" fill="#ffe066" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="420" cy="76" r="6" fill="#ffe066" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="510" cy="70" r="7" fill="#ffe066" filter="drop-shadow(0 0 7px #ffbe0b)"/>

      <circle cx="70" cy="130" r="6" fill="#ffd166" filter="drop-shadow(0 0 5px #ffbe0b)"/>
      <circle cx="210" cy="140" r="7" fill="#ffd166" filter="drop-shadow(0 0 6px #ffbe0b)"/>
      <circle cx="370" cy="120" r="6" fill="#ffd166" filter="drop-shadow(0 0 5px #ffbe0b)"/>
      <circle cx="490" cy="108" r="7" fill="#ffd166" filter="drop-shadow(0 0 6px #ffbe0b)"/>
    </g>

    <!-- Wall art / hanging tapestry & hanging plant silhouette on right -->
    <g opacity="0.6">
      <rect x="40" y="20" width="85" height="110" fill="#e5e5e5" opacity="0.2" stroke="#000" stroke-width="2"/>
      <line x1="475" y1="100" x2="475" y2="180" stroke="#000" stroke-width="2"/>
      <circle cx="475" cy="195" r="14" fill="#a0522d" stroke="#000" stroke-width="2"/>
      <path d="M465,185 Q475,170 485,185" fill="none" stroke="#38b000" stroke-width="3"/>
    </g>

    <!-- Floor cobble paving at bottom -->
    <polygon points="0,580 600,580 600,750 0,750" fill="#141113"/>
    <line x1="0" y1="580" x2="600" y2="580" stroke="#000000" stroke-width="4"/>

    <!-- FIGURE: TORSO & STREETWEAR -->
    <!-- Grey long-sleeve under-layer -->
    <path d="M120,490 L210,380 L390,380 L480,490 L460,750 L140,750 Z" fill="#9ca3af" stroke="#000000" stroke-width="4"/>
    <!-- Grey Left Arm -->
    <path d="M120,490 L160,700 L210,700 L195,490 Z" fill="#9ca3af" stroke="#000000" stroke-width="4"/>
    <!-- Grey Right Arm raising paddle -->
    <path d="M480,490 L440,650 L390,650 L410,480 Z" fill="#9ca3af" stroke="#000000" stroke-width="4"/>

    <!-- Black T-shirt Layer with drop-shoulders -->
    <path d="M160,420 L230,390 L370,390 L440,420 L430,550 L400,560 L400,750 L200,750 L200,560 L170,550 Z" fill="#09090b" stroke="#000000" stroke-width="5"/>
    <rect x="180" y="420" width="240" height="330" fill="url(#dotScreen)" opacity="0.4"/>

    <!-- Black crossbody messenger strap -->
    <polygon points="210,390 245,390 405,750 370,750" fill="#18181b" stroke="#000000" stroke-width="4"/>
    <polygon points="170,610 240,620 230,750 160,750" fill="#121214" stroke="#000000" stroke-width="4"/>

    <!-- White graphic box prints on t-shirt -->
    <g opacity="0.85">
      <rect x="235" y="460" width="40" height="45" rx="5" fill="none" stroke="#ffffff" stroke-width="2.5"/>
      <path d="M245,490 Q255,470 265,490" stroke="#ffffff" stroke-width="2" fill="none"/>
      
      <rect x="335" y="480" width="45" height="42" rx="5" fill="none" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="345" y1="490" x2="370" y2="510" stroke="#ffffff" stroke-width="2"/>
      <line x1="370" y1="490" x2="345" y2="510" stroke="#ffffff" stroke-width="2"/>

      <!-- Graphic text on tee -->
      <text x="325" y="555" fill="#f4f4f5" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" letter-spacing="1">FAKIEBOB</text>
      <text x="325" y="568" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700">CREATIVE LEAD</text>
    </g>

    <!-- RIGHT HAND HOLDING PADDLE HANDLE -->
    <!-- Forearm extending upward -->
    <path d="M375,530 L320,500 L300,520 L350,560 Z" fill="#d4a373" stroke="#000000" stroke-width="3.5"/>
    <!-- Wrist with red & white beaded bracelet -->
    <rect x="310" y="505" width="22" height="7" rx="3" fill="#e11d48" stroke="#000000" stroke-width="2"/>
    <circle cx="315" cy="508" r="2.5" fill="#ffffff"/>
    <circle cx="323" cy="508" r="2.5" fill="#e11d48"/>
    <!-- Hand gripping handle -->
    <path d="M285,475 Q310,470 315,495 Q305,515 285,510 Z" fill="#d4a373" stroke="#000000" stroke-width="3.5"/>

    <!-- PADDLE HANDLE -->
    <rect x="290" y="445" width="16" height="50" rx="4" fill="#a0522d" stroke="#000000" stroke-width="3" transform="rotate(-6 298 470)"/>

    <!-- THE ICONIC CARTOON PADDLE MASK (IN FRONT OF FACE) -->
    <!-- Paddle Head (Rounded Oval / Fan Shape) with warm timber color -->
    <g transform="translate(300, 320) rotate(-4)">
      <!-- Paddle Outline & Base -->
      <path d="M-85,-95 C-85,-165 85,-165 85,-95 C85,-10 65,55 0,75 C-65,55 -85,-10 -85,-95 Z" fill="#c97a48" stroke="#000000" stroke-width="6"/>
      <path d="M-85,-95 C-85,-165 85,-165 85,-95 C85,-10 65,55 0,75 C-65,55 -85,-10 -85,-95 Z" fill="url(#dotScreen)" opacity="0.2"/>

      <!-- Inner face skin tone -->
      <path d="M-75,-85 C-75,-145 75,-145 75,-85 C75,-15 55,45 0,60 C-55,45 -75,-15 -75,-85 Z" fill="#e07a4b"/>

      <!-- Black Cartoon Hair / Straight Bangs -->
      <path d="M-85,-95 C-85,-165 85,-165 85,-95 C65,-80 40,-85 20,-80 C0,-75 -20,-80 -45,-78 C-65,-80 -75,-88 -85,-95 Z" fill="#18181b" stroke="#000000" stroke-width="5"/>
      <path d="M-80,-95 Q-40,-75 0,-80 Q40,-75 80,-95 Z" fill="#18181b"/>

      <!-- Big expressive cartoon eyes -->
      <!-- Left Eye -->
      <ellipse cx="-35" cy="-35" rx="14" ry="10" fill="#18181b"/>
      <circle cx="-38" cy="-38" r="3.5" fill="#ffffff"/>
      <!-- Right Eye -->
      <ellipse cx="35" cy="-35" rx="14" ry="10" fill="#18181b"/>
      <circle cx="32" cy="-38" r="3.5" fill="#ffffff"/>

      <!-- Focused / cute frown mouth -->
      <path d="M-15,10 Q0,-2 15,10" fill="none" stroke="#18181b" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Wooden lower rim shadow -->
      <path d="M-55,45 Q0,65 55,45 L45,55 Q0,75 -45,55 Z" fill="#8c3a1e" stroke="#000000" stroke-width="2"/>
    </g>

    <!-- FROZEN IN FLIGHT TENNIS BALL -->
    <!-- Motion lines -->
    <path d="M160,345 Q175,340 190,342" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    <path d="M150,360 Q170,358 195,360" stroke="#ccff33" stroke-width="4" stroke-linecap="round" opacity="0.7"/>

    <!-- Tennis Ball (Vibrant Lime-Chartreuse with white seam) -->
    <g transform="translate(210, 350)">
      <circle cx="0" cy="0" r="28" fill="#ccff00" stroke="#000000" stroke-width="4" filter="drop-shadow(3px 3px 0px #000)"/>
      <path d="M-18,-18 Q0,-6 18,-18" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <path d="M-18,18 Q0,6 18,18" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <!-- Soft highlight -->
      <circle cx="-8" cy="-8" r="6" fill="#ffffff" opacity="0.6"/>
    </g>

    <!-- Top Badge Ribbon -->
    <g transform="translate(30, 30)">
      <rect x="0" y="0" width="165" height="30" fill="#e11d48" stroke="#000000" stroke-width="3" filter="drop-shadow(3px 3px 0px #000)"/>
      <text x="82" y="20" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">FAKIEBOB // ART</text>
    </g>

    <!-- Bottom Signature Strip -->
    <g transform="translate(30, 680)">
      <rect x="0" y="0" width="540" height="42" fill="#09090b" stroke="#ffffff" stroke-width="3" filter="drop-shadow(4px 4px 0px #e11d48)"/>
      <text x="18" y="27" fill="#ffffff" font-family="'Oswald', 'Dela Gothic One', sans-serif" font-size="16" font-weight="900" letter-spacing="1">FAKIEBOB</text>
      <text x="140" y="27" fill="#e11d48" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">CREATIVE LEAD & PRODUCT DESIGNER</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
