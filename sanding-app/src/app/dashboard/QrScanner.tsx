'use client';
import { useEffect, useRef } from 'react';

type Detector = { detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]> };
declare global { interface Window { BarcodeDetector?: new (o: { formats: string[] }) => Detector } }

export const canScan = () => typeof window !== 'undefined' && 'BarcodeDetector' in window && !!navigator.mediaDevices?.getUserMedia;

/** Rear camera + BarcodeDetector. Calls onCode once per distinct QR text; stops the camera on unmount. */
export default function QrScanner({ onCode, onError }: { onCode: (raw: string) => void; onError: (m: string) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const cb = useRef({ onCode, onError });
  useEffect(() => { cb.current = { onCode, onError }; });
  useEffect(() => {
    let alive = true, last = '', stream: MediaStream | null = null, timer: ReturnType<typeof setTimeout>;
    (async () => {
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); }
      catch { cb.current.onError('Camera not available. Search by name or code instead.'); return; }
      if (!alive || !video.current || !window.BarcodeDetector) { stream.getTracks().forEach((t) => t.stop()); return; }
      video.current.srcObject = stream;
      await video.current.play().catch(() => {});
      const det = new window.BarcodeDetector({ formats: ['qr_code'] });
      const tick = async () => {
        if (!alive || !video.current) return;
        try {
          const raw = (await det.detect(video.current))[0]?.rawValue || '';
          if (raw && raw !== last) { last = raw; cb.current.onCode(raw); }
        } catch { /* frame not ready */ }
        timer = setTimeout(tick, 350);
      };
      tick();
    })();
    return () => { alive = false; clearTimeout(timer); stream?.getTracks().forEach((t) => t.stop()); };
  }, []);
  return (
    <div className="scan-box">
      <video ref={video} playsInline muted />
      <span className="muted" style={{ fontSize: 13 }}>Point the camera at the guest’s pass</span>
    </div>
  );
}
