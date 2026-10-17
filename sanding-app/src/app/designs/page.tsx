import SiteHeader from '@/components/SiteHeader';
import DesignGallery from './DesignGallery';
import { FAMILIES, THEMES } from '@/lib/invite/engine';

const FAMILY_COUNT = Object.keys(FAMILIES).filter((k) => THEMES.some((t) => t.fam === k)).length;

export const metadata = { title: 'The collection' };

export default function DesignsPage() {
  return (
    <>
      <SiteHeader current="designs" />
      <main className="wrap">
        <div className="page-head" style={{ paddingBottom: 0 }}>
          <p className="eyebrow">Design gallery</p>
          <h1 style={{ marginTop: 10 }}>The collection</h1>
          <p className="muted" style={{ marginTop: 10, maxWidth: '60ch' }}>{FAMILY_COUNT} families and {THEMES.length} designs. Filter by family or by colour. Every design includes every feature. Tap a design to open it with sample details.</p>
        </div>
        <DesignGallery />
      </main>
    </>
  );
}
