import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SwitchContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 4px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* position: absolute; removed to fit in navbar flex */
  /* top, left, right removed */
`;

const LangButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  outline: none;
  
  &.active {
    color: var(--primary-color);
  }
`;

const ActiveBackground = styled(motion.div)`
  position: absolute;
  top: 4px;
  left: 4px;
  bottom: 4px;
  width: calc(50% - 4px);
  background: white;
  border-radius: 20px;
  z-index: 0;
`;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <SwitchContainer dir="ltr">
            <ActiveBackground
                animate={{
                    x: i18n.language === 'ar' ? '100%' : '0%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <LangButton
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                English
            </LangButton>
            <LangButton
                onClick={() => changeLanguage('ar')}
                className={i18n.language === 'ar' ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                العربية
            </LangButton>
        </SwitchContainer>
    );
};

export default LanguageSwitcher;
