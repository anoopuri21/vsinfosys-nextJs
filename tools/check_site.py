#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self): super().__init__();self.ids=set();self.dups=[];self.links=[];self.h1=0;self.title=False;self.description=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:self.dups.append(a['id'])
            self.ids.add(a['id'])
        if tag=='a' and a.get('href'):self.links.append(a['href'])
        if tag=='h1':self.h1+=1
        if tag=='title':self.title=True
        if tag=='meta' and a.get('name')=='description' and a.get('content'):self.description=True
errors=[];pages={}
for file in ROOT.rglob('*.html'):
    if any(x in file.parts for x in ['design']):continue
    p=Page();p.feed(file.read_text());pages[file]=p
    if file.name!='404.html' and p.h1!=1:errors.append(f'{file.relative_to(ROOT)}: expected 1 H1, found {p.h1}')
    if p.dups:errors.append(f'{file.relative_to(ROOT)}: duplicate ids {p.dups}')
    if not p.title:errors.append(f'{file.relative_to(ROOT)}: missing title')
    if file.name!='404.html' and not p.description:errors.append(f'{file.relative_to(ROOT)}: missing description')
for file,p in pages.items():
    for href in p.links:
        if href.startswith(('#','mailto:','tel:','javascript:','http://','https://')):continue
        path=unquote(urlsplit(href).path)
        target=(file.parent/path).resolve()
        if path.endswith('/') or not target.suffix:target=target/'index.html'
        if not target.exists():errors.append(f'{file.relative_to(ROOT)}: broken link {href} -> {target.relative_to(ROOT) if ROOT in target.parents else target}')
print(f'Checked {len(pages)} HTML pages.')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print('All structural and local-link checks passed.')
