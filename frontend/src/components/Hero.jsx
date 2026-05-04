import { motion } from "framer-motion";
import { Scan, Leaf } from "lucide-react";
import PotatoLeaf from '../assets/potato-leaves.jpg'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full text-emerald-700 mb-6 text-sm font-semibold">
            <Leaf size={18} />
            AI for Smart Farming
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-emerald-950">
            Detect <span className="text-emerald-600">Potato Leaf Diseases</span>
            <br /> in Seconds
          </h1>

          <p className="mt-6 text-emerald-900/70 text-lg max-w-xl">
            Upload a potato leaf image and our CNN-powered AI instantly
            identifies Early Blight, Late Blight, or Healthy leaves
            with high accuracy.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to={"/predict"} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold">
              <Scan size={20} />
              Start Detection
            </Link>

            <Link
              to="/#features"
              className="px-6 py-3 rounded-xl border border-emerald-200 hover:bg-emerald-50 text-emerald-900 font-semibold text-center"
            >
              How it works
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full" />
          <img
            src={PotatoLeaf}
            alt="Potato Leaf"
            className="relative rounded-3xl shadow-2xl hidden md:block"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
