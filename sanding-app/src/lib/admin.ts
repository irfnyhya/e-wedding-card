import 'server-only';

/** Emails allowed into /admin. ADMIN_EMAILS (comma separated) overrides the default owner. */
const ADMINS = (process.env.ADMIN_EMAILS || 'irfanyahya808@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const isAdmin = (email: string | null | undefined) => !!email && ADMINS.includes(email.toLowerCase());
