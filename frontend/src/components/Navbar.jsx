import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sprout, Menu, X } from 'lucide-react'


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkBase =
    "text-sm font-semibold text-emerald-900/70 hover:text-emerald-600 transition-colors";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link
            to={"/"}
            className="flex items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="p-2 rounded-xl bg-emerald-100 text-primary group-hover:bg-emerald-300 transition-colors duration-300">
              <Sprout className="h-6 w-6 text-emerald-700" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-emerald-950">
              AgroVision
            </span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <NavLink to="/#features" className={navLinkBase}>
              How it Works
            </NavLink>

            <NavLink to="/#history" className={navLinkBase}>
              Recent Scans
            </NavLink>

            <NavLink to="/#faq" className={navLinkBase}>
              FAQ
            </NavLink>

            <Link
              to="/predict"
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200/80 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Try It Now
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-emerald-200 text-emerald-800"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-emerald-100 bg-white/90">
          <div className="px-5 py-5 flex flex-col gap-4">
            <NavLink
              to="/#features"
              className={navLinkBase}
              onClick={() => setOpen(false)}
            >
              How it Works
            </NavLink>
            <NavLink
              to="/#history"
              className={navLinkBase}
              onClick={() => setOpen(false)}
            >
              Recent Scans
            </NavLink>
            <NavLink
              to="/#faq"
              className={navLinkBase}
              onClick={() => setOpen(false)}
            >
              FAQ
            </NavLink>
            <Link
              to="/predict"
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold text-center"
              onClick={() => setOpen(false)}
            >
              Try It Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
