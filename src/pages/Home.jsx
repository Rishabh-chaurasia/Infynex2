import Hero from '../components/home/Hero';
import ConnectedHub from '../components/home/ConnectedHub';
import { ServiceShowcase } from '../components/home/ServicesShowcase';
import { B2BHighlight } from '../components/home/Highlights';
import { WhyInfynex, BlogPreview, AboutPreview } from '../components/home/Trust';
import CTASection from '../components/ui/CTASection';
import ServiceAssistant from '../components/home/ServiceAssistant';
import { images } from '../data/images';
import usePageTitle from '../hooks/usePageTitle';
export default function Home() {
    usePageTitle('Infynex Technologies — Technology, infrastructure and services');
    return (<>
      <Hero />
      <AboutPreview />
      <ConnectedHub />
      <ServiceShowcase />
      <B2BHighlight />
      <WhyInfynex />
      <BlogPreview />
      <CTASection image={images.desk}/>
      <ServiceAssistant />
    </>);
}
