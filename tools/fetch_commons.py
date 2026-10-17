"""Downloads public-domain / CC0 images from Wikimedia Commons search results.
Usage: python -I tools/fetch_commons.py <out_dir> <tag>="<search>" [<tag>="<search>" ...]
Writes <tag>NN.jpg and appends credits to <out_dir>/credits.json.
"""
import json, os, re, sys, urllib.parse, urllib.request

UA = {'User-Agent': 'SandingPrototype/0.1 (stationery research)'}
out = sys.argv[1]
os.makedirs(out, exist_ok=True)
cred_path = os.path.join(out, 'credits.json')
credits = json.load(open(cred_path)) if os.path.exists(cred_path) else []
for arg in sys.argv[2:]:
    tag, q = arg.split('=', 1)
    params = {'action': 'query', 'format': 'json', 'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': 900,
              'iiextmetadatafilter': 'LicenseShortName|Artist'}
    if q.startswith('Category:'):  # list files in a category instead of searching
        params.update({'generator': 'categorymembers', 'gcmtitle': q, 'gcmtype': 'file', 'gcmlimit': 14})
    else:
        params.update({'generator': 'search', 'gsrnamespace': 6, 'gsrsearch': q, 'gsrlimit': 8})
    u = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    pages = json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30)).get('query', {}).get('pages', {})
    for i, p in enumerate(pages.values()):
        ii = p['imageinfo'][0]
        lic = ii.get('extmetadata', {}).get('LicenseShortName', {}).get('value', '')
        if not re.search(r'public domain|cc0|^pd', lic, re.I) or not ii.get('thumburl'):
            continue
        fn = f'{tag}{i:02d}.jpg'
        try:
            data = urllib.request.urlopen(urllib.request.Request(ii['thumburl'], headers=UA), timeout=30).read()
            open(os.path.join(out, fn), 'wb').write(data)
            credits.append({'file': fn, 'title': p['title'], 'license': lic, 'page': ii.get('descriptionurl', '')})
            print(fn, lic, flush=True)
        except Exception as e:
            print('fail', fn, e, flush=True)
json.dump(credits, open(cred_path, 'w'), indent=1)
