import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AMC = lazy(() => import('./pages/services/AMC'))
const Hardware = lazy(() => import('./pages/services/Hardware'))
const ITInfra = lazy(() => import('./pages/services/ITInfra'))
const CloudServer = lazy(() => import('./pages/services/CloudServer'))
const TeleServices = lazy(() => import('./pages/services/TeleServices'))
const RoboticDuctCleaning = lazy(() => import('./pages/services/RoboticDuctCleaning'))
const TechnicalSupport = lazy(() => import('./pages/services/TechnicalSupport'))
const Helpdesk = lazy(() => import('./pages/services/Helpdesk'))
const VehicleVendor = lazy(() => import('./pages/services/VehicleVendor'))
const Solar = lazy(() => import('./pages/services/Solar'))
const B2BB2C = lazy(() => import('./pages/services/B2BB2C'))

function Fallback() {
  return <div className="min-h-screen bg-navy-900" aria-hidden />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/amc" element={<AMC />} />
            <Route path="services/hardware" element={<Hardware />} />
            <Route path="services/it-infra" element={<ITInfra />} />
            <Route path="services/cloud-server" element={<CloudServer />} />
            <Route path="services/tele-services" element={<TeleServices />} />
            <Route path="services/robotic-duct-cleaning" element={<RoboticDuctCleaning />} />
            <Route path="services/technical-support" element={<TechnicalSupport />} />
            <Route path="services/helpdesk" element={<Helpdesk />} />
            <Route path="services/vehicle-vendor" element={<VehicleVendor />} />
            <Route path="services/solar" element={<Solar />} />
            <Route path="services/b2b-b2c" element={<B2BB2C />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
