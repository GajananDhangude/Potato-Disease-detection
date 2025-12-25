import { motion } from "framer-motion";
import { Scan, Leaf } from "lucide-react";
import PotatoLeaf from '../assets/potato-leaves.jpg'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-900/30 px-4 py-2 rounded-full text-green-400 mb-6">
            <Leaf size={18} />
            AI for Smart Farming
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Detect <span className="text-green-400">Potato Leaf Diseases</span>
            <br /> Using Deep Learning
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Upload a potato leaf image and our CNN-powered AI instantly
            identifies Early Blight, Late Blight, or Healthy leaves
            with high accuracy.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to={"/predict"} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-semibold">
              <Scan size={20} />
              Start Detection
            </Link>

            <button className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-300">
              How it works
            </button>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
          <img
            src={PotatoLeaf}
            alt="Potato Leaf"
            className="relative rounded-2xl shadow-2xl hidden md:block"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
