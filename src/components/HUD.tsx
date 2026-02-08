import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut, Info, Github } from 'lucide-react';

export function HUD() {
  return (
    <>
      {/* Top left - Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] flex items-center justify-center text-xl">
          🐴
        </div>
        <div>
          <h1 className="text-sm font-semibold text-[var(--color-text)]">Jelačićeva Kuća</h1>
          <p className="text-xs text-[var(--color-text-secondary)]">Interactive 3D</p>
        </div>
      </motion.div>

      {/* Bottom left - Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-6 glass-panel px-4 py-3"
      >
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Drag to rotate
          </span>
          <span className="flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" /> Scroll to zoom
          </span>
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Click rooms to explore
          </span>
        </div>
      </motion.div>

      {/* Bottom right - Credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 flex items-center gap-3"
      >
        <a
          href="https://github.com/nevenito"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
        >
          <Github className="w-5 h-5" />
        </a>
        <span className="text-xs text-[var(--color-text-secondary)]">
          Built with 🤍 by Jelačić AI
        </span>
      </motion.div>

      {/* Top right - Historical badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6"
      >
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-secondary)]">
            Historical Recreation
          </span>
        </div>
      </motion.div>
    </>
  );
}
