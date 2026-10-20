import {notFound} from 'next/navigation';import {resources} from '../../../lib/data';import {ResourceDetail} from '../../../components/resource-detail';
export function generateStaticParams(){return resources.map(r=>({slug:r.slug}))}
export default function Resource({params}:{params:{slug:string}}){const r=resources.find(x=>x.slug===params.slug);if(!r)notFound();return <ResourceDetail r={r}/>}
