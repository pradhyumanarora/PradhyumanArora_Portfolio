import Script from 'next/script'

/**
 * Loads Google Analytics 4 (gtag.js) on every page.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set, so local development and
 * builds without a Measurement ID stay untracked. The ID is a public
 * client-side identifier, so it is safe to expose in the built HTML.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
