import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaCalculator, FaHome, FaEnvelope } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Menu = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  color: white;
  font-size: 1.5rem;
  background: transparent;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledLink = styled(NavLink)`
  color: var(--text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &.active {
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-dark);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changed from center to avoid clipping */
  align-items: center;
  gap: 2rem;
  padding: 6rem 2rem 2rem 2rem; /* Added top padding for close button */
  overflow-y: auto; /* Enable scrolling for small landscape screens */
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  ${props => props.dir === 'rtl' ? 'left: 2rem;' : 'right: 2rem;'}
  background: transparent;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dir = i18n.dir();

  const links = [
    { to: "/", icon: <FaHome />, label: t('nav_home') },
    { to: "/calc", icon: <FaCalculator />, label: t('nav_calc') },
    { to: "/contact", icon: <FaEnvelope />, label: t('nav_contact') },
  ];

  return (
    <Nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <Logo to="/">GPA.PRO</Logo>

      <Menu>
        {links.map(link => (
          <StyledLink key={link.to} to={link.to}>
            {link.icon} {link.label}
          </StyledLink>
        ))}
        <LanguageSwitcher />
      </Menu>

      <MobileMenuBtn onClick={() => setIsOpen(true)}>
        <FaBars />
      </MobileMenuBtn>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: dir === 'rtl' ? '100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? '100%' : '100%' }}
          >
            <CloseBtn onClick={() => setIsOpen(false)} dir={dir}>
              <FaTimes />
            </CloseBtn>

            {links.map(link => (
              <StyledLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '1.5rem' }}
              >
                {link.icon} {link.label}
              </StyledLink>
            ))}
            <div style={{ marginTop: '1rem' }}>
              <LanguageSwitcher />
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
