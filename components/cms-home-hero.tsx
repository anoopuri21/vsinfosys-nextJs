'use client';
import { useEffect, useState } from 'react';
type RemotePage={title?:string;summary?:string;body_json?:string};
const api=process.env.NEXT_PUBLIC_CONTENT_API_ORIGIN;
export function CmsHomeHero(){const [copy,setCopy]=useState({title:'Build digital systems that move business forward.',summary:'VS Infosys designs and develops high-performance websites, e-commerce stores, mobile apps and digital marketing systems for ambitious organisations.'});useEffect(()=>{if(!api)return;fetch(`${api}/v1/content/page/home`,{headers:{accept:'application/json'}}).then(r=>r.ok?r.json():null).then((page:RemotePage|null)=>{if(page?.title)setCopy({title:page.title,summary:page.summary||copy.summary})}).catch(()=>undefined)},[]);return <><h1>{copy.title}</h1><p className="lead">{copy.summary}</p></>}
