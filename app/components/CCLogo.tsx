type Layout = "inline" | "stacked" | "iconOnly";

type Props = {
  size?: number;
  color?: string;
  layout?: Layout;
  className?: string;
};

const MARK_PATH =
  "M4395 4654 c-1484 -144 -2631 -871 -3460 -2194 -364 -581 -672 -1333 -844 -2056 -86 -366 -87 -384 -9 -384 83 0 109 23 688 595 812 802 1069 999 1515 1159 283 101 818 179 926 133 60 -25 69 -65 28 -130 -134 -212 -207 -368 -240 -516 -106 -480 201 -875 856 -1101 477 -164 848 -168 1297 -14 436 150 819 416 1338 932 364 363 500 470 745 588 289 140 553 197 910 198 268 1 278 -10 192 -212 -145 -338 -179 -593 -112 -847 110 -418 605 -670 1485 -756 145 -14 171 -10 218 37 34 34 34 35 29 107 -21 286 -242 987 -467 1483 -766 1688 -2075 2701 -3805 2944 -360 50 -958 66 -1290 34z";

const WORD_PATH =
  "M490 1754 c-291 -78 -470 -338 -470 -681 0 -414 232 -690 596 -710 290 -16 525 167 594 463 22 92 21 94 -30 94 -37 0 -39 -2 -45 -37 -53 -316 -315 -498 -615 -427 -472 111 -569 889 -145 1159 276 175 656 53 730 -235 11 -44 12 -45 55 -48 l43 -3 -6 40 c-16 119 -132 275 -252 338 -119 62 -320 83 -455 47z " +
  "M1805 1751 c-254 -73 -419 -283 -455 -583 -55 -450 222 -808 626 -808 283 0 533 223 569 508 l6 52 -43 0 -44 0 -11 -67 c-49 -284 -328 -469 -600 -399 -264 67 -416 290 -417 611 -1 193 46 335 149 452 257 291 758 208 846 -141 11 -45 12 -46 50 -46 49 0 52 7 33 71 -52 177 -187 306 -370 354 -80 21 -261 19 -339 -4z " +
  "M3242 1068 l3 -673 290 1 c287 0 291 0 371 27 272 90 400 300 398 652 -1 242 -43 370 -161 496 -134 142 -236 169 -629 169 l-274 0 2 -672z m624 572 c184 -47 292 -167 340 -377 14 -63 13 -318 -2 -383 -36 -158 -135 -295 -254 -353 -93 -46 -173 -57 -407 -57 l-213 0 0 595 0 595 228 0 c197 0 240 -3 308 -20z " +
  "M6390 1640 l0 -100 35 0 35 0 0 100 0 100 -35 0 -35 0 0 -100z " +
  "M8770 1688 c-124 -63 -121 -257 5 -318 94 -46 204 -8 246 84 72 159 -93 313 -251 234z m169 -35 c93 -70 84 -205 -19 -258 -113 -59 -242 63 -200 189 27 84 148 121 219 69z " +
  "M8808 1634 c-5 -4 -8 -49 -8 -101 0 -86 1 -93 20 -93 16 0 20 7 20 33 l1 32 28 -32 c15 -19 37 -33 49 -33 29 0 28 8 -5 42 -25 26 -25 29 -10 46 21 23 22 75 2 92 -17 14 -87 25 -97 14z m69 -45 c16 -16 5 -39 -18 -39 -12 0 -19 7 -19 18 0 31 17 41 37 21z " +
  "M4775 1376 c-215 -52 -349 -275 -332 -551 14 -212 96 -349 255 -423 79 -37 264 -39 353 -4 64 25 139 87 173 141 25 39 66 143 66 166 0 23 -69 20 -77 -2 -62 -184 -165 -263 -339 -263 -135 0 -233 56 -293 169 -31 59 -60 167 -61 224 l0 27 390 0 390 0 0 73 c0 307 -243 512 -525 443z m243 -86 c105 -45 187 -169 199 -302 l6 -58 -351 0 -351 0 5 33 c34 195 116 302 263 344 64 18 165 11 229 -17z " +
  "M5725 1384 c-169 -26 -265 -117 -265 -249 0 -154 91 -226 357 -280 235 -48 295 -90 301 -210 l4 -73 -42 -45 c-51 -56 -106 -77 -222 -84 -185 -12 -321 76 -345 223 -8 48 -9 49 -46 52 l-37 3 0 -44 c0 -107 102 -238 221 -284 70 -27 285 -25 363 4 125 47 179 116 184 233 8 174 -66 237 -353 300 -249 55 -307 94 -307 205 0 118 93 179 272 180 171 0 255 -55 280 -184 5 -30 10 -55 10 -57 0 -2 16 -4 35 -4 l35 0 0 48 c0 102 -89 216 -194 248 -52 15 -198 26 -251 18z " +
  "M6971 1380 c-197 -42 -323 -225 -324 -470 -1 -169 34 -270 126 -367 83 -88 137 -108 287 -108 169 0 247 37 322 155 l29 45 -3 -165 c-4 -224 -35 -287 -168 -349 -86 -41 -252 -38 -335 4 -73 37 -121 97 -131 160 -6 45 -7 45 -46 45 l-40 0 7 -47 c25 -179 179 -273 420 -260 199 11 327 111 364 285 7 35 11 221 11 552 l0 500 -41 0 -40 0 3 -90 c2 -50 3 -90 2 -90 0 0 -15 22 -33 49 -76 118 -254 184 -410 151z m244 -95 c135 -65 204 -216 193 -418 -13 -230 -144 -372 -343 -372 -204 0 -334 149 -342 390 -6 220 93 382 262 426 57 15 173 2 230 -26z " +
  "M8020 1375 c-99 -28 -188 -97 -227 -175 l-18 -35 -3 98 -3 97 -34 0 -35 0 0 -485 0 -485 34 0 34 0 5 308 c5 334 9 366 65 465 58 103 155 152 297 151 89 0 138 -19 187 -71 61 -64 63 -74 68 -478 l5 -370 38 -3 38 -3 -3 378 c-4 430 -7 450 -89 532 -75 75 -239 109 -359 76z " +
  "M6390 875 l0 -485 35 0 35 0 0 485 0 485 -35 0 -35 0 0 -485z";

const MARK_VB_W = 993.466;
const MARK_VB_H = 465.057;
const MARK_TRANSFORM = "translate(-2.491655,467.056636) scale(0.1,-0.1)";

const WORD_VB_W = 901.835;
const WORD_VB_H = 175.012;
const WORD_TRANSFORM = "translate(-2.007525,177.162391) scale(0.1,-0.1)";

const MARK_ASPECT = MARK_VB_W / MARK_VB_H;
const WORD_ASPECT = WORD_VB_W / WORD_VB_H;

function MarkSvg({ height, color }: { height: number; color: string }) {
  return (
    <svg
      viewBox={`0 0 ${MARK_VB_W} ${MARK_VB_H}`}
      width={height * MARK_ASPECT}
      height={height}
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <g transform={MARK_TRANSFORM} fill={color}>
        <path d={MARK_PATH} />
      </g>
    </svg>
  );
}

function WordSvg({ height, color }: { height: number; color: string }) {
  return (
    <svg
      viewBox={`0 0 ${WORD_VB_W} ${WORD_VB_H}`}
      width={height * WORD_ASPECT}
      height={height}
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <g transform={WORD_TRANSFORM} fill={color}>
        <path d={WORD_PATH} fillRule="evenodd" />
      </g>
    </svg>
  );
}

export function CCLogo({
  size = 32,
  color = "currentColor",
  layout = "inline",
  className,
}: Props) {
  if (layout === "iconOnly") {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", color, lineHeight: 1 }}
        aria-label="CC Design"
      >
        <MarkSvg height={size} color={color} />
      </span>
    );
  }

  if (layout === "stacked") {
    const wordHeight = size * (WORD_VB_H / MARK_VB_H);
    const gap = size * (74 / MARK_VB_H);
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap,
          color,
          lineHeight: 1,
        }}
        aria-label="CC Design"
      >
        <MarkSvg height={size} color={color} />
        <WordSvg height={wordHeight} color={color} />
      </span>
    );
  }

  const wordHeight = size * 0.52;
  const gap = size * 0.32;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        color,
        lineHeight: 1,
      }}
      aria-label="CC Design"
    >
      <MarkSvg height={size} color={color} />
      <WordSvg height={wordHeight} color={color} />
    </span>
  );
}
