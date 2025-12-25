import React from 'react'
import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link
            to={"/"}
            className="flex items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="p-2 rounded-lg bg-green-100  text-primary group-hover:bg-green-400  transition-colors duration-300">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              AgroVision
            </span>
          </Link>

          <div className="hidden sm:flex gap-8 items-center">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-green-500 transition-colors"
            >
              How it Works
            </a>

            <a
              href="#history"
              className="text-sm font-medium text-muted-foreground hover:text-green-500 transition-colors"
            >
              Recent Scans
            </a>

            <Link
              href="/"
              className="bg-green-500  px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Try It Now
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
