import React from "react";
import { Activity, Radar, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Activity,
    label: "Model Accuracy",
    value: "96%",
    detail: "Validation accuracy on PlantVillage",
  },
  {
    icon: Radar,
    label: "Prediction Time",
    value: "< 2s",
    detail: "Average response on local model",
  },
  {
    icon: ShieldCheck,
    label: "Classes Covered",
    value: "3",
    detail: "Early, Late Blight, Healthy",
  },
];

export default function Stats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="glass-card rounded-3xl p-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-900/60">
                    {item.label}
                  </p>
                  <p className="text-2xl font-display font-bold text-emerald-900">
                    {item.value}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-emerald-900/70">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
