'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Invite from './Invite';
import type { Card } from '@/lib/card';
import type { InviteOptions } from '@/lib/invite/engine';

/** Full-screen phone-width invitation over the page, as in the prototype. */
export default function InviteOverlay({ card, opts, closeLabel, onClose }: { card: Partial<Card>; opts?: InviteOptions; closeLabel: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', k); };
  }, [onClose]);
  // Portalled to <body>: the paper theme stacks each body child, so inside <main> it would sit under the header.
  return createPortal(
    <div className="inv-overlay">
      <Invite className="inv-host" card={card} opts={{ mode: 'live', ...opts }} />
      <button type="button" className="inv-close" onClick={onClose}>{closeLabel}</button>
    </div>,
    document.body,
  );
}
