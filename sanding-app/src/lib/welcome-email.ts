// The "your card is live" email as subject, HTML and plain text. Pure, so it can be rendered and checked without a database.

export type WelcomeData = {
  names: string; dateText: string; venue: string; pkgName: string; permata: boolean; diraja: boolean;
  link: string; linkText: string; dash: string; guide: string; until: string;
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function welcomeEmail(d: WelcomeData) {
  const { names, permata, diraja, link, dash, guide, until } = d;
  const steps: [string, string][] = [
    ['Send your link', `Copy ${d.linkText} and send it on WhatsApp, Telegram or Instagram. Guests open it in their phone browser; nothing to install.`],
    ['Watch the replies', 'Open My cards on kadkahwin.website. The RSVP list shows every reply and the total pax, updating while you watch.'],
    ...(permata ? [
      ['Read the ucapan', 'The Ucapan tab shows every wish. Hide or delete any message before other guests see it.'],
      ['Personal guest links', 'In the Guest links tab, type one name per line and save. Each guest gets a link with their name on the cover, with a WhatsApp button beside it.'],
    ] as [string, string][] : []),
    ...(diraja ? [
      ['Check guests in on the day', 'Turn on the E-pass in Edit, Extras. On the day, open the Check-in tab at the reception desk and scan each guest’s QR code, or search by name or code.'],
    ] as [string, string][] : []),
    ['Change anything, any time', `Press Edit, make the change and save. Guests see it next time they open the card. Your card stays online until ${until}.`],
  ];

  const subject = `${names}, your card is live`;
  const html = `<!doctype html><html><body style="margin:0;background:#f3eee5;font-family:Georgia,'Times New Roman',serif;color:#221b17">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee5"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf8f2;border:1px solid #e2d9cb">
<tr><td style="padding:36px 32px 8px;text-align:center">
  <div style="font-style:italic;font-size:30px">Sanding</div>
  <div style="font:11px Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f645a;margin-top:2px">kad kahwin digital</div>
</td></tr>
<tr><td style="padding:24px 32px 0;text-align:center">
  <div style="font:11px Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#6e1a26">${esc(d.pkgName)} package</div>
  <h1 style="font-weight:400;font-size:30px;line-height:1.15;margin:10px 0 8px">${esc(names)}, your card is live</h1>
  <p style="font:15px/1.6 Arial,sans-serif;color:#6f645a;margin:0">${esc(d.dateText)} · ${esc(d.venue)}</p>
</td></tr>
<tr><td style="padding:24px 32px;text-align:center">
  <div style="font:14px 'Courier New',monospace;background:#ebe4d8;padding:12px;word-break:break-all"><a href="${link}" style="color:#221b17;text-decoration:none">${esc(d.linkText)}</a></div>
  <p style="margin:18px 0 0"><a href="${link}" style="display:inline-block;background:#6e1a26;color:#fbf6ee;font:600 12px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:13px 22px">Open card</a>
  &nbsp; <a href="${dash}" style="display:inline-block;border:1px solid #221b17;color:#221b17;font:600 12px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:12px 21px">My cards</a></p>
</td></tr>
<tr><td style="padding:8px 32px 8px">
  <h2 style="font-weight:400;font-size:22px;margin:0 0 6px">What to do next</h2>
  ${steps.map(([h, p], i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2d9cb"><tr>
    <td valign="top" style="width:34px;padding:14px 0;font-style:italic;font-size:22px;color:#6e1a26">${i + 1}</td>
    <td style="padding:14px 0"><div style="font:600 14px Arial,sans-serif">${esc(h)}</div><div style="font:14px/1.55 Arial,sans-serif;color:#4a4038;margin-top:3px">${esc(p)}</div></td></tr></table>`).join('')}
</td></tr>
<tr><td style="padding:16px 32px 32px;text-align:center;border-top:1px solid #e2d9cb">
  <p style="font:14px/1.6 Arial,sans-serif;margin:16px 0 14px">Every tab and button on the dashboard is explained, step by step, in the guide.</p>
  <a href="${guide}" style="display:inline-block;background:#221b17;color:#fbf6ee;font:600 12px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:13px 22px">Read the guide</a>
  <p style="font:13px/1.6 Arial,sans-serif;color:#6f645a;margin:22px 0 0">Stuck? WhatsApp Irfan Hakimi at <a href="https://wa.me/60184090065" style="color:#6e1a26">018-409 0065</a>.</p>
</td></tr>
</table></td></tr></table></body></html>`;
  const text = [`${names}, your card is live.`, '', `Your link: ${link}`, `My cards: ${dash}`, '', 'What to do next:',
    ...steps.map(([h, p], i) => `${i + 1}. ${h}: ${p}`), '', `The full guide: ${guide}`, 'Stuck? WhatsApp Irfan Hakimi at 018-409 0065.'].join('\n');
  return { subject, html, text };
}
