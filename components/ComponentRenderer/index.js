import dynamic from "next/dynamic"
import Preloader from "../Preloader"
import { toPascalCase } from "@/lib/helper-functions"
import camelcaseKeys from 'camelcase-keys';


export default function ComponentRenderer({ type, sectionData }) {
    console.log(type, sectionData)
	const sectionsComponentPaths = () => ({
		hero_section: dynamic(
			() => import('@/components/_page-sections/HeroSection')
				.catch(() => () => <div>error</div>), {
			loading: Preloader,
            ssr: true
		})
	});
    console.log(sectionsComponentPaths()[type])
	const SectionComponent = sectionsComponentPaths()[type] || <div>missing</div>;

	return <SectionComponent type={type} {...camelcaseKeys(sectionData)} />
}