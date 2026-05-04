import React from "react";
import { Link } from "react-router-dom";
import { Scan } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto glass-card rounded-[2.5rem] p-10 md:p-14 border border-emerald-100">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 section-title">
              Ready to scan your first leaf?
            </h2>
            <p className="mt-4 text-emerald-900/70">
              Upload a clear image and get a fast prediction in seconds.
              Start building a healthier potato crop today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700"
            >
              <Scan size={18} />
              Start Detection
            </Link>
            <Link
              to="/#features"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-emerald-200 text-emerald-900 font-semibold hover:bg-emerald-50"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
