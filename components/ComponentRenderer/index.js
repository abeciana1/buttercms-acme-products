import dynamic from "next/dynamic"
import Preloader from "../Preloader"
import { toPascalCase } from "@/lib/helper-functions"
import camelcaseKeys from 'camelcase-keys';


export default function ComponentRenderer({ type, sectionData }) {
	const sectionsComponentPaths = () => ({
		[type]: dynamic(
			() => import(`@/components/_page-sections/${toPascalCase(type)}`)
				.catch((error) => () => {
				console.log(error)
				return <div>error</div>
			}), {
			loading: Preloader,
            ssr: true
		})
	});
	const SectionComponent = sectionsComponentPaths()[type] || <div>Missing component: {toPascalCase(type)}</div>;

	return <SectionComponent type={type} {...camelcaseKeys(sectionData)} />
}