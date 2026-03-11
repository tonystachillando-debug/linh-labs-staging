import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

export const Partners: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="py-24 border-y border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{t('partners.title')}</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-28 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">

          {/* TON Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/images/ton-logo.png"
              alt="TON"
              className="h-16 w-auto object-contain"
            />
          </motion.div>

          {/* Polkadot Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/images/polkadot-logo.png"
              alt="Polkadot"
              className="h-16 w-auto object-contain"
            />
          </motion.div>

          {/* ELIZA OS Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/images/eliza-os-logo.png"
              alt="ELIZA OS"
              className="h-16 w-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};