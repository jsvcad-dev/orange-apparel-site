/**
 * Pre-launch switch. The site shows only the "coming soon" page until
 * NEXT_PUBLIC_COMING_SOON is set to "false" in Vercel (then redeploy).
 * While it's on, nothing on the page depends on Fourthwall, so edits made
 * in the Fourthwall dashboard cannot change how it looks.
 */
export const COMING_SOON = process.env.NEXT_PUBLIC_COMING_SOON !== 'false';
