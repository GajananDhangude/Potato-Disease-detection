import React from "react";
import { Sprout, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Sprout size={20} />
            </div>
            <span className="font-display text-lg font-bold text-emerald-950">
              AgroVision
            </span>
          </div>
          <p className="mt-3 text-sm text-emerald-900/70">
            AI-powered potato disease detection for farmers, agronomists, and
            researchers.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-900">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/70">
            <li>Model Accuracy Report</li>
            <li>Best Capture Practices</li>
            <li>Data Privacy</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-900">Contact</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-900/70">
            <Mail size={16} />
            support@agrovision.ai
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-100 text-center text-xs text-emerald-900/60 py-4">
        Built for smart farming. © 2026 AgroVision
      </div>
    </footer>
  );
}
