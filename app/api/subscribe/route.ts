import { NextRequest, NextResponse } from 'next/server';

/**
 * Email signup for the coming-soon page.
 * Forwards the address to a Kit (kit.com) form, so the list lives in Kit and
 * the launch email can be sent from there.
 *
 * Setup: in Kit, create a form, copy its numeric ID (from the form's URL or
 * embed code) and add it in Vercel as KIT_FORM_ID, then redeploy.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email = '';
  try {
    const body = await req.json();
    email = String(body?.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const formId = process.env.KIT_FORM_ID;
  if (!formId || !/^\d+$/.test(formId)) {
    return NextResponse.json(
      { error: 'Signups are not connected yet. Please check back soon.' },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`https://app.kit.com/forms/${formId}/subscriptions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ email_address: email }).toString(),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Kit responded ${res.status}`);
  } catch (err) {
    console.error('[subscribe] failed', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again in a moment.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
