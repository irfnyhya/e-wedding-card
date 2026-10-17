// Writes .env.local from the running local Supabase stack (`supabase start` first).
// Keeps any payment settings already in .env.local.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const status = execSync('npx supabase status -o env', { encoding: 'utf8' });
const env = Object.fromEntries(status.split(/\r?\n/).map((l) => l.match(/^([A-Z_]+)="?(.*?)"?$/)).filter(Boolean).map((m) => [m[1], m[2]]));
const keep = existsSync('.env.local')
  ? Object.fromEntries(readFileSync('.env.local', 'utf8').split(/\r?\n/).map((l) => l.match(/^([A-Z_]+)=(.*)$/)).filter(Boolean).map((m) => [m[1], m[2]]))
  : {};
const out = {
  NEXT_PUBLIC_SITE_URL: keep.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_SUPABASE_URL: env.API_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: env.ANON_KEY || env.PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: env.SERVICE_ROLE_KEY || env.SECRET_KEY,
  RATE_LIMIT_SALT: keep.RATE_LIMIT_SALT || randomBytes(12).toString('hex'),
  PAYMENT_PROVIDER: keep.PAYMENT_PROVIDER || 'mock',
  TOYYIBPAY_SECRET_KEY: keep.TOYYIBPAY_SECRET_KEY || '',
  TOYYIBPAY_CATEGORY_CODE: keep.TOYYIBPAY_CATEGORY_CODE || '',
  TOYYIBPAY_SANDBOX: keep.TOYYIBPAY_SANDBOX || 'true',
  PAYMENT_CALLBACK_BASE_URL: keep.PAYMENT_CALLBACK_BASE_URL || '',
};
if (!out.NEXT_PUBLIC_SUPABASE_URL || !out.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Could not read keys from `supabase status`. Is the stack running?');
writeFileSync('.env.local', Object.entries(out).map(([k, v]) => `${k}=${v}`).join('\n') + '\n');
console.log('Wrote .env.local');
