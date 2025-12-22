import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGPA } from '../context/GPAContext';
import { calculateCumulativeWithPrevious } from '../utils/gpaCalculations';
import SemesterCard from '../components/SemesterCard';
import { FaPlus, FaCalculator } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--glass-bg)'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'};
  }
`;

const ModeContainer = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--card-radius);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Label = styled.label`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.8rem;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ResultSection = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 2rem;
  border-radius: var(--card-radius);
  text-align: center;
  margin-top: 2rem;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
`;

const ResultValue = styled(motion.h2)`
  font-size: 4rem;
  margin: 1rem 0;
  text-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const AddSemesterBtn = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: rgba(255,255,255,0.1);
  border: 1px dashed rgba(255,255,255,0.3);
  border-radius: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const Calc = () => {
  const { t } = useTranslation();
  const { semesters, addSemester } = useGPA();
  const [mode, setMode] = useState('semester'); // 'semester' or 'cumulative'
  const [prevGPA, setPrevGPA] = useState('');
  const [prevCredits, setPrevCredits] = useState('');

  const finalGPA = calculateCumulativeWithPrevious(
    semesters,
    mode === 'cumulative' ? prevGPA : 0,
    mode === 'cumulative' ? prevCredits : 0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageContainer
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Tabs>
        <Tab
          active={mode === 'semester'}
          onClick={() => setMode('semester')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCalculator style={{ marginRight: '0.5rem' }} /> {t('calc_mode_semester')}
        </Tab>
        <Tab
          active={mode === 'cumulative'}
          onClick={() => setMode('cumulative')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus style={{ marginRight: '0.5rem' }} /> {t('calc_mode_cumulative')}
        </Tab>
      </Tabs>

      <AnimatePresence mode='wait'>
        {mode === 'cumulative' && (
          <ModeContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <InputGroup>
              <LabelInput>
                <Label>{t('prev_gpa')}</Label>
                <Input
                  type="number"
                  value={prevGPA}
                  onChange={(e) => setPrevGPA(e.target.value)}
                  placeholder={t('prev_gpa_placeholder')}
                />
              </LabelInput>
              <LabelInput>
                <Label>{t('prev_credits')}</Label>
                <Input
                  type="number"
                  value={prevCredits}
                  onChange={(e) => setPrevCredits(e.target.value)}
                  placeholder={t('prev_credits_placeholder')}
                />
              </LabelInput>
            </InputGroup>
          </ModeContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {semesters.map((semester, index) => (
          <SemesterCard key={semester.id} semester={semester} index={index} />
        ))}
      </AnimatePresence>

      <AddSemesterBtn
        onClick={addSemester}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPlus /> {t('add_semester')}
      </AddSemesterBtn>

      <ResultSection
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <motion.h3
          style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.9 }}
        >
          {t('calculate_results')}
        </motion.h3>
        <ResultValue
          key={finalGPA}
          initial={{ scale: 0.5, opacity: 0, textShadow: "0px 0px 0px rgba(255,255,255,0)" }}
          animate={{
            scale: 1,
            opacity: 1,
            textShadow: ["0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,0,0,0.2)"]
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {finalGPA}
        </ResultValue>
      </ResultSection>
    </PageContainer>
  );
};

export default Calc;
