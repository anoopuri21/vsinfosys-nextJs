import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={metadataBase:new URL('https://vsinfosys.in'),title:{default:'VS Infosys | Websites, Commerce, Apps & Growth',template:'%s | VS Infosys'},description:'VS Infosys designs and develops high-performance websites, e-commerce stores, mobile applications and digital marketing systems from Delhi.',robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
