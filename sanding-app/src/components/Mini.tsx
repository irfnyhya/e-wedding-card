'use client';
import { useEffect, useRef, useState } from 'react';
import Invite from './Invite';
import { SAMPLE } from '@/lib/invite/engine';

/** A real card rendered at 360×640 and scaled to fit its box (gallery, home flat-lay).
    Painted only when it comes within 600px of the viewport: hundreds of live cards at once are too heavy. */
export default function Mini({ template, face, style, label, onOpen, children }: {
  template: string; face?: 'cover' | 'page'; style?: React.CSSProperties; label?: string; onOpen?: () => void; children?: React.ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 360));
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '600px 0px' });
    ro.observe(box.current);
    io.observe(box.current);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  const interactive = onOpen ? { role: 'button', tabIndex: 0, 'aria-label': label, onClick: onOpen,
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } } } : {};
  return (
    <div ref={box} className="mini" style={style} {...interactive}>
      {seen ? <Invite className="scale" style={{ transform: `scale(${scale})` }} card={{ ...SAMPLE, template }} opts={{ mode: 'thumb', face }} /> : <div className="scale" />}
      {children}
    </div>
  );
}
