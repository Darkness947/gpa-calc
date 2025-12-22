import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGPA } from '../context/GPAContext';
import { calculateCumulativeGPA } from '../utils/gpaCalculations';

const InsightCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 5px solid ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const GPAInsights = () => {
    const { t } = useTranslation();
    const { semesters } = useGPA();
    const gpa = parseFloat(calculateCumulativeGPA(semesters));

    let status = { message: t('good_standing'), color: '#3b82f6' };

    if (gpa >= 3.5) {
        status = { message: t('honor_roll'), color: '#10b981' };
    } else if (gpa >= 3.0) {
        status = { message: t('very_good'), color: '#8b5cf6' };
    } else if (gpa >= 2.0) {
        status = { message: t('good'), color: '#3b82f6' };
    } else if (gpa > 0) {
        status = { message: t('probation'), color: '#ef4444' };
    } else {
        return null;
    }

    return (
        <InsightCard
            color={status.color}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={status.message}
        >
            <Message>{status.message}</Message>
        </InsightCard>
    );
};

export default GPAInsights;
