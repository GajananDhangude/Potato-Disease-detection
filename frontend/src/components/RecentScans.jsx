import React, { useEffect, useState } from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";

const HISTORY_KEY = "agrovision_history";

export default function RecentScans() {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    setHistory(stored);
  };

  useEffect(() => {
    loadHistory();

    const handleStorage = (event) => {
      if (event.key === HISTORY_KEY) {
        loadHistory();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  return (
    <section id="history" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 section-title">
              Recent Scans
            </h2>
            <p className="mt-2 text-emerald-900/70">
              Your last predictions are saved locally for quick reference.
            </p>
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <Trash2 size={16} />
              Clear history
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {history.length === 0 && (
            <div className="glass-card rounded-3xl p-6 border border-emerald-100 text-center text-emerald-900/70">
              No scans yet. Run a prediction to see your results here.
            </div>
          )}

          {history.map((entry) => (
            <div
              key={entry.id}
              className="glass-card rounded-3xl p-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    {entry.label}
                  </p>
                  <p className="text-xs text-emerald-900/60">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-emerald-900/70">
                <span>{entry.filename}</span>
                <span className="font-semibold text-emerald-700">
                  {entry.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
