import React from "react";
import { motion } from "framer-motion";

const GlassCard = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;