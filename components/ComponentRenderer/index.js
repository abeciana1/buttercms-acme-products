import dynamic from "next/dynamic"
import Preloader from "../Preloader"
import { toPascalCase } from "@/lib/helper-functions"
import camelcaseKeys from 'camelcase-keys';
import MissingSection from '@/components/_page-sections/MissingSection'

const ComponentRenderer = ({ type, sectionData, products = [] }) => {
	const sectionsComponentPaths = () => ({
		[type]: dynamic(
			() => import(`@/components/_page-sections/${toPascalCase(type)}`)
				.catch(() => () => MissingSection), {
			loading: Preloader,
            ssr: true
		})
	});
	const SectionComponent = sectionsComponentPaths()[type] || MissingSection;
	return <SectionComponent key={type+Date.now()} type={type} {...camelcaseKeys(sectionData)} products={products} />
}

export default ComponentRenderer