# Canva AI — Resolve IG Cover Template Prompt

*Paste the prompt below into Canva's "Ask Canva" or "Magic Design" prompt box. It tells the AI exactly what to build. Tested-style language — direct, explicit, with a "do not include" section because Canva AI tends to add decoration unprompted.*

---

## How to use

1. In Canva, open a new design at **1080×1080 px** (Instagram Post — Square). If you want 4:5 portrait posts instead, use **1080×1350**.
2. Click **Ask Canva** (top of the canvas).
3. Paste the prompt below exactly.
4. Canva will produce a draft. Review against the brand spec doc (`08_Resolve_Brand_Kit_Spec.md`). Tweak typography, color, and spacing manually if anything's off.
5. Save the result as a **template** in Canva (File → Save as template, or just duplicate the design for each new post and swap text).

---

## The prompt (paste this whole block)

> Create a minimal, editorial Instagram post template for "Resolve," a boutique real estate practice. Square 1080×1080 canvas.
>
> **Background:** solid soft off-white #F7F8FA. Not pure white.
>
> **Layout, left-aligned with a generous 80px left margin and lots of negative space:**
>
> 1. **Top-left, small caps eyebrow label** in teal #0E8BA3, font Inter Bold, size 22, letter-spacing wide (+14%): "RESOLVE · SITUATION"
>
> 2. **Center, large headline** in dark navy #0B1F3D, font Inter ExtraBold (weight 800), size 90, letter-spacing tight (-4%), line height 1.05, left-aligned, three lines:
>    "A Notice of Sale
>    is not the end
>    of the story."
>
> 3. **Just below the headline, on the left, a single small sage green circle** filled #2F8A73, 28px diameter. This is the only decorative element on the entire design. No other shapes, lines, dividers, or graphics.
>
> 4. **Bottom-left, small caps situation tag** in sage #2F8A73, font Inter Bold, size 20, letter-spacing wide (+14%): "POWER OF SALE & MORTGAGE ARREARS"
>
> 5. **Bottom-right, wordmark** in dark navy #0B1F3D, font Inter Bold, size 20, right-aligned: "resolveproperty.ca"
>
> 6. **Bottom-left, below the situation tag, very small caption** in muted gray #4A5870, font Inter Medium, size 13: "HomeLife G1 Realty Inc., Brokerage"
>
> **Aesthetic:** calm, dignified, editorial — like a literary press cover or a quiet law-firm announcement. Generous white space. Minimal type hierarchy. Looks confident and quiet, not busy.
>
> **Do NOT include:** photography of any kind, icons, illustrations, gradients, shadows, decorative shapes, badges, ribbons, swooshes, lines, dividers, frames, borders, emoji, or any cheerful real-estate visual language. The only ornament on the entire design is the one sage green dot below the headline.
>
> **Font:** Inter only, used at multiple weights. No mixing typefaces.
>
> The design should be ready to swap the headline text, the eyebrow tag, and the situation tag for future variations of this same template.

---

## After the AI generates it — quick sanity checks

Before you save it as a template, open the brand spec doc (`08_Resolve_Brand_Kit_Spec.md`) and verify against Section 6, the manual recipe. Common things Canva AI gets slightly wrong:

- **Wrong background.** It often defaults to pure white #FFFFFF. Manually set to #F7F8FA.
- **Wrong typeface.** It may substitute "Inter" with something close — Helvetica Neue, Manrope, DM Sans. Any of those are acceptable; just pick one and stick with it across every Resolve design.
- **Added decoration.** Canva AI loves adding little flourishes (a line under the eyebrow, a corner shape, a soft shadow). Delete any element that isn't in the list above. The discipline is what makes the brand.
- **Wrong text alignment.** It may center-align the headline. Force left-align.
- **Headline too small.** If the AI uses, say, 64pt for the headline, bump it back up to 80–96pt. The hook should dominate the canvas.

---

## For story highlight covers (1080×1920 portrait)

Same prompt, but change the opening to:

> Create a minimal editorial Instagram Story cover for "Resolve." Portrait 1080×1920 canvas. Solid off-white #F7F8FA background.
>
> **Centered composition:**
> 1. A dark navy circle (fill #0B1F3D, diameter 360px) centered at roughly 1/3 height.
> 2. Inside that circle, a sage green dot (fill #2F8A73, diameter 90px) centered.
> 3. Below the circle, a single word in dark navy #0B1F3D, font Inter ExtraBold (800), size 80, centered: "POWER OF SALE" (or whichever situation).
> 4. At the very bottom in muted gray #4A5870, font Inter Medium, size 24, centered: "resolveproperty.ca"
>
> No other graphics. No photography. No additional ornament.

Generate one per situation (swap the word). These become your six Story Highlight icons.

---

## Variables you swap for each new post

When you duplicate the template for a new post, only these three things change:

| Field | Example values |
|---|---|
| **Eyebrow tag** | `RESOLVE · SITUATION` / `RESOLVE · SELLER REPRESENTATION` / `RESOLVE · A NOTE` |
| **Headline** | The hook for the post (3 lines, max ~22 characters per line) |
| **Situation tag** | `POWER OF SALE & MORTGAGE ARREARS` / `SEPARATION & DIVORCE` / `ESTATE & PROBATE SALES` / etc. |

Everything else — background color, sage dot, wordmark, brokerage line — stays identical across every post. That's what makes the system feel like one practice instead of a content factory.
