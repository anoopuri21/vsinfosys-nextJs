'use client';

import { useEffect, useState } from 'react';
import { runtimeConfig } from '@/lib/runtime-config';

type RemotePage = { title?: string; summary?: string };
const fallback = { title: 'Build digital systems that move business forward.', summary: 'VS Infosys designs and develops high-performance websites, e-commerce stores, mobile apps and digital marketing systems for ambitious organisations.' };

export function CmsHomeHero() {
  const [copy, setCopy] = useState(fallback);
  useEffect(() => {
    if (!runtimeConfig.contentApiOrigin) return;
    fetch(`${runtimeConfig.contentApiOrigin}/v1/content/page/home`, { headers: { accept: 'application/json' } })
      .then(response => response.ok ? response.json() as Promise<RemotePage> : null)
      .then(page => { if (page?.title) setCopy({ title: page.title, summary: page.summary || fallback.summary }); })
      .catch(() => undefined);
  }, []);
  return <><h1>{copy.title}</h1><p className="lead">{copy.summary}</p></>;
}
