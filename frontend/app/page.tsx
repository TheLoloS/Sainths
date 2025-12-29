'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MusicPlayer from '@/components/ui/MusicPlayer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 }
  },
};

interface GameCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
  disabled?: boolean;
  color: 'green' | 'red';
}

function GameCard({ href, title, description, icon, disabled, color }: GameCardProps) {
  const colorClasses = color === 'green' 
    ? 'from-green-600/80 to-green-800/80 hover:from-green-500/90 hover:to-green-700/90 border-green-400/30' 
    : 'from-red-600/60 to-red-800/60 border-red-400/20 opacity-60 cursor-not-allowed';

  const content = (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      className={`
        glass p-6 rounded-2xl cursor-pointer
        bg-gradient-to-br ${colorClasses}
        border transition-all duration-300
        ${disabled ? '' : 'hover:shadow-2xl hover:shadow-green-500/20'}
        flex flex-col items-center text-center gap-4
        min-h-[200px] justify-center
      `}
    >
      <span className="text-5xl">{icon}</span>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
      {disabled && (
        <span className="badge badge-warning gap-2">
          🛠️ Wkrótce
        </span>
      )}
    </motion.div>
  );

  if (disabled) {
    return <div className="relative">{content}</div>;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {/* Modal powitalny z glassmorphism */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass p-8 md:p-12 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-6xl mb-4 block">🎄</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white christmas-font mb-4">
                Witamy na Wigilijce!
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Kliknij głośniczek, jeżeli chcesz grać w akompaniamencie świątecznych rytmów!
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MusicPlayer urls={['/bg-music.mp3']} />
              <button 
                className="btn glass-btn px-8" 
                onClick={() => setIsModalOpen(false)}
              >
                Zaczynamy! 🎅
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Główna zawartość */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl w-full"
        >
          {/* Hero sekcja */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="glass inline-block px-8 py-6 mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white christmas-font">
                🎄 Sainths 🎄
              </h1>
              <p className="text-white/80 text-lg md:text-xl mt-2">
                Świąteczne gry dla całej rodziny
              </p>
            </div>
          </motion.div>

          {/* Wybierz tryb gry */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 christmas-font">
              ✨ Wybierz tryb gry ✨
            </h2>
          </motion.div>

          {/* Grid z kartami */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <GameCard
              href="/local/main"
              title="Graj lokalnie"
              description="Stwórz grę i zaproś znajomych w tej samej sieci"
              icon="🖥️"
              color="green"
            />
            <GameCard
              href="/local/user"
              title="Dołącz do gry"
              description="Dołącz do istniejącej gry używając kodu"
              icon="🎮"
              color="green"
            />
            <GameCard
              href="/online/main"
              title="Graj online"
              description="Stwórz grę dostępną z internetu"
              icon="🌐"
              color="red"
              disabled
            />
            <GameCard
              href="/online/user"
              title="Dołącz online"
              description="Dołącz do gry przez internet"
              icon="📱"
              color="red"
              disabled
            />
          </motion.div>

          {/* Sekcja informacyjna */}
          <motion.div variants={itemVariants} className="glass p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 christmas-font text-center">
              🎁 Jak grać? 🎁
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <span className="text-4xl mb-3 block">1️⃣</span>
                <h4 className="font-bold text-white mb-2">Stwórz grę</h4>
                <p className="text-white/70 text-sm">
                  Wybierz &quot;Graj lokalnie&quot; aby stworzyć pokój gry
                </p>
              </div>
              <div className="p-4">
                <span className="text-4xl mb-3 block">2️⃣</span>
                <h4 className="font-bold text-white mb-2">Udostępnij kod</h4>
                <p className="text-white/70 text-sm">
                  Podaj znajomym wygenerowany kod dostępu
                </p>
              </div>
              <div className="p-4">
                <span className="text-4xl mb-3 block">3️⃣</span>
                <h4 className="font-bold text-white mb-2">Bawcie się!</h4>
                <p className="text-white/70 text-sm">
                  Wybierz grę i rywalizujcie w świątecznej atmosferze
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stopka */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Wesołych Świąt! 🎅❄️🎄
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
