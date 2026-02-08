import { motion } from 'framer-motion';
import { X, BookOpen, Sword, Home, DoorOpen } from 'lucide-react';

interface InfoPanelProps {
  room: string;
  onClose: () => void;
}

const ROOM_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  facts: string[];
}> = {
  'main-hall': {
    title: 'Velika Dvorana',
    subtitle: 'The Great Hall',
    icon: <Home className="w-6 h-6" />,
    description: 'The heart of Jelačić\'s residence, where crucial decisions for Croatian independence were made. The walls have witnessed countless meetings with nobles, generals, and diplomats.',
    facts: [
      'Hosted the Croatian Sabor meetings in 1848',
      'Original oak floor still preserved',
      'Portraits of the Jelačić family line the walls',
    ],
  },
  'library': {
    title: 'Knjižnica',
    subtitle: 'The Library',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'A vast collection of military treatises, Croatian literature, and European philosophy. Jelačić was known for his love of learning and strategic thinking.',
    facts: [
      'Over 3,000 volumes in the original collection',
      'Includes rare Croatian manuscripts from the 16th century',
      'Jelačić\'s personal journal is stored here',
    ],
  },
  'war-room': {
    title: 'Ratna Soba',
    subtitle: 'The War Room',
    icon: <Sword className="w-6 h-6" />,
    description: 'Where the Ban planned his military campaigns against Hungarian forces. Maps, strategies, and the famous march on Vienna were orchestrated from this room.',
    facts: [
      'Original campaign maps from 1848-1849',
      'Jelačić\'s sword displayed on the wall',
      'Strategic position allowed views of all approaches',
    ],
  },
  'entry': {
    title: 'Ulazna Dvorana',
    subtitle: 'The Entry Hall',
    icon: <DoorOpen className="w-6 h-6" />,
    description: 'The grand entrance featuring the Croatian coat of arms and family crest. Every visitor was reminded of Croatian pride upon entering.',
    facts: [
      'Marble columns from Dalmatia',
      'Hand-carved wooden doors from Slavonian oak',
      'Checkered Croatian šahovnica inlaid in the floor',
    ],
  },
};

export function InfoPanel({ room, onClose }: InfoPanelProps) {
  const data = ROOM_DATA[room];
  
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute top-4 right-4 bottom-4 w-[360px] glass-panel p-6 flex flex-col"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
      </button>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-accent)]/20 flex items-center justify-center mb-4">
        <div className="text-[var(--color-gold)]">{data.icon}</div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
        {data.title}
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        {data.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-[var(--color-text)] leading-relaxed mb-6">
        {data.description}
      </p>

      {/* Facts */}
      <div className="flex-1">
        <h3 className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
          Historical Facts
        </h3>
        <ul className="space-y-2">
          {data.facts.map((fact, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <span className="text-[var(--color-gold)] mt-1">•</span>
              {fact}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-[var(--color-text-secondary)]">
          Click on other parts of the house to explore more
        </p>
      </div>
    </motion.div>
  );
}
