import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLightbulb, FaRocket, FaBookReader, FaUsers, FaBrain, FaDumbbell } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
`;

const HugeTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.1;
  background: linear-gradient(to right, #fff, var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    gap: 0.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 1.2rem 3.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.5);
    &::before {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.4;
`;

const TipsSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TipsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TipCard = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  padding: 2.5rem;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.2);
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
    transform: translateY(-10px) scale(1.02);
  }
`;

const TipIcon = styled.div`
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  background: rgba(6, 182, 212, 0.1);
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TipText = styled.p`
  font-size: 1.2rem;
  color: var(--text-primary);
  line-height: 1.6;
  font-weight: 500;
`;

const Home = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroWordVariants = {
    hidden: { opacity: 0, y: -100, rotate: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const tips = [
    { id: 1, icon: <FaRocket /> },
    { id: 2, icon: <FaBrain /> },
    { id: 3, icon: <FaDumbbell /> },
    { id: 4, icon: <FaUsers /> },
    { id: 5, icon: <FaBookReader /> },
    { id: 6, icon: <FaLightbulb /> },
  ];

  return (
    <div>
      <HeroSection>
        <BackgroundShape
          animate={{
            x: (mousePosition.x * -0.05),
            y: (mousePosition.y * -0.05),
          }}
          transition={{ type: 'spring', damping: 50 }}
          style={{ width: '600px', height: '600px', top: '-10%', left: '-10%', background: 'var(--primary-color)' }}
        />
        <BackgroundShape
          animate={{
            x: (mousePosition.x * 0.05),
            y: (mousePosition.y * 0.05),
          }}
          transition={{ type: 'spring', damping: 50 }}
          style={{ width: '500px', height: '500px', bottom: '-10%', right: '-10%', background: 'var(--secondary-color)' }}
        />

        <HugeTitle>
          {t('hero_title').split(' ').map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={heroWordVariants}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          ))}
        </HugeTitle>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {t('hero_subtitle')}
        </Subtitle>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <CTAButton to="/calc">
            {t('start_calculating')} <FaArrowRight />
          </CTAButton>
        </motion.div>
      </HeroSection>

      <TipsSection>
        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaLightbulb color="yellow" /> {t('study_tips')}
        </SectionTitle>

        <TipsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              variants={cardVariants}
            >
              <TipIcon>{tip.icon}</TipIcon>
              <TipText>{t(`tip_${tip.id}`)}</TipText>
            </TipCard>
          ))}
        </TipsGrid>
      </TipsSection>
    </div>
  );
};

export default Home;
