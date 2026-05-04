import { useEffect, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
  Leaf,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { predictDisease } from "../services/api";

const PredictionUI = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE_MB = 5;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handlePredict = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const data = await predictDisease(image);
      const normalizedConfidence = Math.round((data.confidence || 0) * 100);

      const payload = {
        ...data,
        confidence: normalizedConfidence,
      };

      setResult(payload);
      updateHistory({
        id: `${Date.now()}`,
        label: payload.class,
        confidence: normalizedConfidence,
        filename: image.name,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const getStatusMeta = (label) => {
    if (!label) return { icon: Leaf, tone: "text-emerald-700", accent: "bg-emerald-100" };

    if (label.toLowerCase().includes("healthy")) {
      return { icon: CheckCircle2, tone: "text-emerald-700", accent: "bg-emerald-100" };
    }

    if (label.toLowerCase().includes("late")) {
      return { icon: AlertTriangle, tone: "text-amber-700", accent: "bg-amber-100" };
    }

    return { icon: AlertTriangle, tone: "text-rose-700", accent: "bg-rose-100" };
  };

  const resetUpload = () => {
    setPreview(null);
    setImage(null);
    setResult(null);
    setError(null);
  };

  const updateHistory = (entry) => {
    const stored = JSON.parse(localStorage.getItem("agrovision_history") || "[]");
    const next = [entry, ...stored].slice(0, 6);
    localStorage.setItem("agrovision_history", JSON.stringify(next));
  };

  const resultMeta = getStatusMeta(result?.class);
  const ResultIcon = resultMeta.icon;

  return (
    <section className="py-24 px-4" id="predict">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide">
          AI DISEASE DETECTION
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl font-display font-extrabold text-emerald-950 section-title">
          Analyze Potato Leaf Health
        </h2>

        <p className="mt-3 text-emerald-900/70 max-w-xl mx-auto">
          Upload a potato leaf image and let our AI instantly detect diseases
          with high accuracy.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
        <div className="space-y-6">
          {!preview && (
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 cursor-pointer transition glass-card ${
                isDragging ? "border-emerald-400 bg-emerald-50" : "border-emerald-200"
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <Upload size={28} />
              </div>

              <p className="font-semibold text-emerald-900 text-lg">
                Upload a potato leaf image
              </p>

              <p className="text-sm text-emerald-900/60 mt-1">
                Drag & drop or click to browse (JPG, PNG up to {MAX_FILE_SIZE_MB}MB)
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}

          {preview && (
            <div className="glass-card rounded-3xl p-6 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="text-emerald-600" />
                <div>
                  <p className="font-semibold text-emerald-900">Image Preview</p>
                  <p className="text-xs text-emerald-900/60">{image?.name}</p>
                </div>
              </div>

              <img
                src={preview}
                alt="Uploaded leaf"
                className="rounded-2xl max-h-80 mx-auto object-contain"
              />

              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  {loading ? "Analyzing..." : "Predict Disease"}
                </button>

                <button
                  onClick={resetUpload}
                  className="px-6 py-3 rounded-xl border border-emerald-200 text-emerald-900 hover:bg-emerald-50"
                >
                  Change Image
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-center text-rose-600 font-semibold">
              {error}
            </p>
          )}

          {result && (
            <div className="glass-card rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resultMeta.accent}`}>
                  <ResultIcon size={22} className={resultMeta.tone} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">Detection Result</h3>
                  <p className="text-sm text-emerald-900/60">Confidence score included</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-emerald-900/60 uppercase tracking-[0.2em]">Disease Detected</p>
                  <p className={`text-lg font-semibold mt-2 ${resultMeta.tone}`}>
                    {result.class}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-900/60 uppercase tracking-[0.2em]">Confidence</p>
                  <p className="text-lg font-semibold mt-2 text-emerald-900">
                    {result.confidence}%
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2.5 rounded-full bg-emerald-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${Math.min(result.confidence, 100)}%` }}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <ShieldCheck size={18} />
                  Suggested Next Steps
                </div>
                <ul className="mt-2 text-sm text-emerald-900/70 space-y-1">
                  <li>Inspect nearby leaves for similar symptoms.</li>
                  <li>Remove infected foliage and avoid overhead watering.</li>
                  <li>Consult a local agronomist for treatment guidance.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-emerald-100">
            <h3 className="font-display text-2xl font-bold text-emerald-900">Upload Tips</h3>
            <p className="mt-2 text-sm text-emerald-900/70">
              Better photos lead to better predictions. Follow these quick tips:
            </p>
            <ul className="mt-4 space-y-3 text-sm text-emerald-900/70">
              <li className="flex gap-2">
                <Leaf size={18} className="text-emerald-600 mt-0.5" />
                Use natural light and avoid strong shadows.
              </li>
              <li className="flex gap-2">
                <Leaf size={18} className="text-emerald-600 mt-0.5" />
                Capture the leaf flat and in focus.
              </li>
              <li className="flex gap-2">
                <Leaf size={18} className="text-emerald-600 mt-0.5" />
                Include only one leaf per image for best accuracy.
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-emerald-100">
            <h3 className="font-display text-2xl font-bold text-emerald-900">Why It Works</h3>
            <p className="mt-2 text-sm text-emerald-900/70">
              Our CNN model was trained on curated Potato Leaf datasets and learns
              visual patterns linked to Early Blight, Late Blight, and Healthy leaves.
            </p>
            <div className="mt-4 flex items-center gap-2 text-emerald-700 text-sm font-semibold">
              <ShieldCheck size={16} />
              Confidence calibrated on validation data
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionUI;
