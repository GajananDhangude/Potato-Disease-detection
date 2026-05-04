import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import RecentScans from '../components/RecentScans'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
export default function Home() {
  return (
    <div>
        <Hero/>
        <Stats/>
        <HowItWorks/>
        <RecentScans/>
        <FAQ/>
        <CTA/>
    </div>
  )
}
