import MagneticButton from '../components/ui/MagneticButton';
import AnimatedText from '../components/ui/AnimatedText';
import usePageTitle from '../hooks/usePageTitle';
export default function NotFound() {
    usePageTitle('Page not found — Infynex Technologies');
    return (<section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow text-teal-600">404</p>
      <AnimatedText as="h1" trigger="mount" text="That page does not exist." className="mt-4 font-display text-4xl font-semibold text-navy-900 md:text-6xl"/>
      <div className="mt-10"><MagneticButton to="/">Back to home</MagneticButton></div>
    </section>);
}
