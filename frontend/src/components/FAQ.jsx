import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the model?",
    answer:
      "The model is trained on the PlantVillage dataset and reaches strong validation accuracy for the three target classes.",
  },
  {
    question: "What image quality do I need?",
    answer:
      "Use a well-lit, in-focus photo of a single leaf. Avoid heavy shadows or blurry images for best results.",
  },
  {
    question: "Does this replace expert diagnosis?",
    answer:
      "No. The prediction is a decision-support tool. For treatment, consult a local agronomist or extension officer.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 section-title">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-emerald-900/70">
          Quick answers to common questions about the prediction workflow.
        </p>

        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="glass-card rounded-3xl p-6 border border-emerald-100 group"
            >
              <summary className="flex items-center justify-between cursor-pointer text-emerald-900 font-semibold">
                {item.question}
                <ChevronDown size={18} className="text-emerald-700 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-emerald-900/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
