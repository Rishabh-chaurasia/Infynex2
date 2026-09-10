import Hero from '../components/home/Hero'
import { ServicesIntro, ServiceShowcase } from '../components/home/ServicesShowcase'
import Capabilities from '../components/home/Capabilities'
import Infrastructure from '../components/home/Infrastructure'
import { RoboticHighlight, SolarHighlight, B2BHighlight } from '../components/home/Highlights'
import { WhyInfynex, Clients, BlogPreview, AboutPreview } from '../components/home/Trust'
import CTASection from '../components/ui/CTASection'
import { images } from '../data/images'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle('Infynex Technologies — Technology, infrastructure and services')
  return (
    <>
      <Hero />
      <ServicesIntro />
      <ServiceShowcase />
      <Capabilities />
      <Infrastructure />
      <RoboticHighlight />
      <SolarHighlight />
      <B2BHighlight />
      <WhyInfynex />
      <Clients />
      <BlogPreview />
      <AboutPreview />
      <CTASection image={images.desk} />
    </>
  )
}
