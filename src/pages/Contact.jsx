import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaGlobe } from 'react-icons/fa';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 3rem;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
`;

const ContactCard = styled(motion.a)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--card-radius);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--glass-shadow);
    &::before {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
`;

const Label = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
`;

const Info = styled.p`
  color: var(--text-secondary);
`;

const Contact = () => {
  const { t } = useTranslation();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageContainer>
      <Header>
        <Title
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {t('contact_title')}
        </Title>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}
        >
          {t('contact_subtitle')}
        </motion.p>
      </Header>

      <ContactGrid>
        <ContactCard
          href="mailto:husdfdf@gmail.com"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <IconWrapper><FaEnvelope /></IconWrapper>
          <Label>{t('email')}</Label>
          <Info>husdfdf@gmail.com</Info>
        </ContactCard>

        <ContactCard
          href="https://www.linkedin.com/in/hussain-alhumaidi-6726b334a/"
          target="_blank"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <IconWrapper><FaLinkedin /></IconWrapper>
          <Label>{t('linkedin')}</Label>
          <Info>Connect on LinkedIn</Info>
        </ContactCard>

        <ContactCard
          href="https://github.com/Darkness947"
          target="_blank"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <IconWrapper><FaGithub /></IconWrapper>
          <Label>{t('github')}</Label>
          <Info>Follow on GitHub</Info>
        </ContactCard>

        <ContactCard
          href="https://hussain-portfolio-dev.netlify.app"
          target="_blank"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <IconWrapper><FaGlobe /></IconWrapper>
          <Label>{t('portfolio')}</Label>
          <Info>Visit Portfolio</Info>
        </ContactCard>
      </ContactGrid>
    </PageContainer>
  );
};

export default Contact;
