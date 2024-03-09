import type { SVGProps } from 'react';

export function SolarCalendarDateLinear(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="#8a8787" strokeWidth={1.25}><path d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z"></path><path strokeLinecap="round" d="M7 4V2.5M17 4V2.5"></path><path strokeLinecap="round" strokeLinejoin="round" d="m9 14.5l1.5-1.5v4"></path><path strokeLinecap="round" d="M13 16v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0ZM2.5 9h19"></path></g></svg>);
}