"""
Resolve Instagram cover-card SVG generator.
Produces 7 square (1080x1080) SVGs — one intro + six situations — using the Resolve brand system.
Run from this folder:  python3 _generate_covers.py
"""

import os

OUT = os.path.dirname(os.path.abspath(__file__))

# Brand tokens
BG       = "#f7f8fa"
INK      = "#0b1f3d"
INK_SOFT = "#4a5870"
SAGE     = "#2f8a73"
TEAL     = "#0e8ba3"

# Typography (system-safe stack so it renders the same in Canva imports)
SANS = "Inter, Manrope, 'DM Sans', 'Helvetica Neue', Arial, sans-serif"

CARDS = [
    {
        "slug": "01_launch",
        "eyebrow": "RESOLVE · SELLER REPRESENTATION",
        "tag": "AN INTRODUCTION",
        "lines": [
            "Some sales",
            "need more than a",
            "standard listing.",
        ],
    },
    {
        "slug": "02_power-of-sale",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "POWER OF SALE & MORTGAGE ARREARS",
        "lines": [
            "A Notice of Sale",
            "is not the end",
            "of the story.",
        ],
    },
    {
        "slug": "03_separation",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "SEPARATION & DIVORCE",
        "lines": [
            "Selling the matrimonial",
            "home should not",
            "blow up the file.",
        ],
    },
    {
        "slug": "04_estate",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "ESTATE & PROBATE SALES",
        "lines": [
            "An estate property",
            "has its own",
            "pace.",
        ],
    },
    {
        "slug": "05_financial",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "FINANCIAL PRESSURE & DEBT",
        "lines": [
            "When selling the home",
            "is part of",
            "the strategy.",
        ],
    },
    {
        "slug": "06_transitions",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "MAJOR LIFE TRANSITIONS",
        "lines": [
            "A sale at a hard",
            "moment deserves",
            "more care, not less.",
        ],
    },
    {
        "slug": "07_disputes",
        "eyebrow": "RESOLVE · SITUATION",
        "tag": "PROPERTY DISPUTES",
        "lines": [
            "Partition and sale",
            "orders are a",
            "specific kind of file.",
        ],
    },
]

# Auto-shrink the hook font if any line is long, so it always fits the canvas nicely.
def hook_font_size(lines):
    longest = max(len(l) for l in lines)
    if longest <= 18:
        return 96
    if longest <= 22:
        return 84
    if longest <= 26:
        return 74
    return 66

def xml_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def render_svg(card):
    # XML-safe all text content
    card = {
        **card,
        "eyebrow": xml_escape(card["eyebrow"]),
        "tag":     xml_escape(card["tag"]),
        "lines":   [xml_escape(l) for l in card["lines"]],
    }
    fs = hook_font_size(card["lines"])
    # Vertical centering of the 3-line hook
    line_height = fs * 1.08
    block_h = line_height * len(card["lines"])
    start_y = 540 - (block_h / 2) + (fs * 0.78)  # baseline of first line

    tspans = []
    for i, line in enumerate(card["lines"]):
        y = start_y + (i * line_height)
        tspans.append(
            f'<text x="80" y="{y:.1f}" font-family="{SANS}" font-size="{fs}" '
            f'font-weight="800" fill="{INK}" letter-spacing="-1.2">{line}</text>'
        )

    hook_text = "\n  ".join(tspans)

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <!-- Background -->
  <rect width="1080" height="1080" fill="{BG}"/>

  <!-- Soft inner border -->
  <rect x="40" y="40" width="1000" height="1000" fill="none" stroke="#dde2eb" stroke-width="1"/>

  <!-- Eyebrow (top-left) -->
  <text x="80" y="110" font-family="{SANS}" font-size="22" font-weight="700"
        fill="{TEAL}" letter-spacing="3">{card["eyebrow"]}</text>

  <!-- Hook (center-left) -->
  {hook_text}

  <!-- Sage dot accent under hook -->
  <circle cx="100" cy="{start_y + block_h + 50:.1f}" r="14" fill="{SAGE}"/>

  <!-- Situation tag (bottom-left) -->
  <text x="80" y="980" font-family="{SANS}" font-size="20" font-weight="700"
        fill="{SAGE}" letter-spacing="2.8">{card["tag"]}</text>

  <!-- Wordmark (bottom-right) -->
  <text x="1000" y="980" font-family="{SANS}" font-size="20" font-weight="700"
        fill="{INK}" text-anchor="end" letter-spacing="-0.4">resolveproperty.ca</text>

  <!-- Brokerage attribution (bottom, very small) -->
  <text x="80" y="1020" font-family="{SANS}" font-size="13" font-weight="500"
        fill="{INK_SOFT}" letter-spacing="0.6">HomeLife G1 Realty Inc., Brokerage</text>
</svg>
'''
    return svg

for card in CARDS:
    path = os.path.join(OUT, f'{card["slug"]}.svg')
    with open(path, "w") as f:
        f.write(render_svg(card))
    print(f"Wrote {path}")

print("Done.")
