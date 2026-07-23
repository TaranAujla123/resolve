import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * Resolve · per-route SEO component.
 *
 * Renders the per-page <title>, meta description, canonical link, Open Graph
 * + Twitter Card tags, and an optional array of JSON-LD blocks.
 *
 * Compliance note (RECO Bulletin 5.1 / LSO Rule 3.1):
 *   Every description and JSON-LD block passed in should identify
 *   "HomeLife G1 Realty Inc., Brokerage" and avoid present-tense legal-
 *   capacity language, outcome guarantees, or "specialist" / "exclusive"
 *   claims. The Resolve home and /buyers descriptions in App.jsx are
 *   pre-cleared on these dimensions.
 */
export function Seo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://resolverealestate.ca/og-image.png?v=2',
  ogImageAlt = 'Resolve · For Ontario homeowners. Facing a difficult property situation?',
  ogType = 'website',
  jsonLd = [],
  noindex = false,
}) {
  const finalOgTitle = ogTitle || title
  const finalOgDescription = ogDescription || description

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Resolve" />
      <meta property="og:locale" content="en_CA" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
