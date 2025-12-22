import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeart, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';

const FooterContainer = styled.footer`
  position: relative;
  background: linear-gradient(180deg, var(--bg-dark) 0%, #000000 100%);
  color: var(--text-secondary);
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.05);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 10;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: ${props => props.dir === 'rtl' ? 'auto' : '0'};
    right: ${props => props.dir === 'rtl' ? '0' : 'auto'};
    bottom: 0;
    width: 30px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  opacity: 0.8;
  font-size: 0.95rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
    padding-left: ${props => props.dir === 'rtl' ? '0' : '5px'};
    padding-right: ${props => props.dir === 'rtl' ? '5px' : '0'};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  border: 1px solid rgba(255,255,255,0.1);
  
  &:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
`;

const BottomBar = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  position: relative;
  z-index: 10;
`;

const Wave = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%238b5cf6' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: cover;
  z-index: 1;
  opacity: 0.3;
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <FooterContainer>
      {/* Animated Background Waves */}
      <Wave
        animate={{ x: [0, 100, 0], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <ContentWrapper>
        <Column>
          <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '900', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            GPA.PRO
          </Link>
          <FooterText>
            {t('footer_desc')}
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://github.com/Darkness947" target="_blank" whileHover={{ y: -5 }}><FaGithub /></SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/hussain-alhumaidi-6726b334a/" target="_blank" whileHover={{ y: -5 }}><FaLinkedin /></SocialIcon>
            <SocialIcon href="https://hussain-portfolio-dev.netlify.app" target="_blank" whileHover={{ y: -5 }}><FaGlobe /></SocialIcon>
          </SocialLinks>
        </Column>

        <Column>
          <FooterTitle dir={dir}>{t('footer_quick_links')}</FooterTitle>
          <FooterLink to="/" dir={dir}>{t('nav_home')}</FooterLink>
          <FooterLink to="/calc" dir={dir}>{t('nav_calc')}</FooterLink>
          <FooterLink to="/contact" dir={dir}>{t('nav_contact')}</FooterLink>
        </Column>

        <Column>
          <FooterTitle dir={dir}>{t('footer_resources')}</FooterTitle>
          <FooterLink to="/" dir={dir}>{t('study_tips')}</FooterLink>
          <FooterLink as="a" href="mailto:husdfdf@gmail.com?subject=Bug Report" dir={dir}>{t('footer_report_bug')}</FooterLink>
          <FooterLink as="a" href="mailto:husdfdf@gmail.com?subject=Feature Request" dir={dir}>{t('footer_feature_request')}</FooterLink>
        </Column>
      </ContentWrapper>

      <BottomBar>
        <div>
          &copy; {new Date().getFullYear()} GPA.PRO. {t('footer_rights')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {t('footer_made_with')} <FaHeart color="#ec4899" /> {t('footer_by')}
        </div>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
