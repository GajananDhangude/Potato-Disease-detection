import { useState } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { predictDisease } from "../services/api";

const PredictionUI = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const data = await predictDisease(image);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f9fbf7] py-24 px-4">

        <div className="text-center mb-12">
  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide">
    AI DISEASE DETECTION
  </span>

  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-800">
    Analyze Potato Leaf Health
  </h2>

  <p className="mt-3 text-gray-600 max-w-xl mx-auto">
    Upload a potato leaf image and let our AI instantly detect diseases
    with high accuracy.
  </p>
</div>

      <div className="max-w-3xl mx-auto">

        {/* Upload */}
        {!preview && (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-2xl p-12 cursor-pointer hover:bg-green-50 transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Upload size={26} />
            </div>

            <p className="font-semibold text-gray-800 text-lg">
              Upload a potato leaf image
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Drag & drop or click to browse
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}

        {/* Preview */}
        {preview && (
          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="text-green-600" />
              <p className="font-semibold text-gray-800">Image Preview</p>
            </div>

            <img
              src={preview}
              alt="Uploaded leaf"
              className="rounded-xl max-h-80 mx-auto object-contain"
            />

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handlePredict}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                {loading ? "Analyzing..." : "Predict Disease"}
              </button>

              <button
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                  setResult(null);
                  setError(null);
                }}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Change Image
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-6 text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-10 bg-white rounded-2xl p-8 border border-green-200 shadow-md text-center">
            <h3 className="text-xl font-bold text-green-600">
              Detection Result
            </h3>

            <p className="mt-4 text-lg text-gray-800">
              Disease Detected:
              <span className="font-semibold text-red-500 ml-2">
                {result.class}
              </span>
            </p>

            <p className="mt-2 text-gray-600">
              Confidence:
              <span className="font-semibold ml-2">
                {result.confidence}%
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PredictionUI;
