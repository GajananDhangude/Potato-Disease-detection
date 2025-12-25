import { Upload, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Leaf Image",
    description:
      "Take a clear photo of a potato leaf and upload it to the system.",
  },
  {
    icon: Cpu,
    title: "AI Analyzes Disease",
    description:
      "Our deep learning model scans the image to detect disease patterns.",
  },
  {
    icon: CheckCircle,
    title: "Get Instant Result",
    description:
      "Receive the disease type with high accuracy in just seconds.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="features"
      className="bg-[#f9fbf7] py-24 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-600">
          How It Works
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Detect potato plant diseases in three simple steps using AI-powered
          image analysis.
        </p>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 hover: shadow-green-800 ">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
