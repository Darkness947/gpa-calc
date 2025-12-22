import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGPA } from '../context/GPAContext';
import { FaTimes } from 'react-icons/fa';

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 40px;
  gap: 1rem;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  width: 100%;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255,255,255,0.05);
  }
  
  &::placeholder {
    color: rgba(255,255,255,0.3);
  }
`;

const Select = styled.select`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  
   &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  option {
    background: #1f2937;
    color: white;
  }
`;

const RemoveBtn = styled(motion.button)`
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        color: #ef4444;
    }
`;

const CourseRow = ({ course, semesterId }) => {
  const { t } = useTranslation();
  const { updateCourse, removeCourse } = useGPA();

  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

  return (
    <Row
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
    >
      <Input
        placeholder={t('course_name')}
        value={course.name}
        onChange={(e) => updateCourse(semesterId, course.id, 'name', e.target.value)}
      />
      <Input
        type="number"
        placeholder={t('credit_hours')}
        value={course.credits}
        onChange={(e) => updateCourse(semesterId, course.id, 'credits', e.target.value)}
        min="0"
        max="20"
      />
      <Select
        value={course.grade}
        onChange={(e) => updateCourse(semesterId, course.id, 'grade', e.target.value)}
      >
        {grades.map(g => <option key={g} value={g}>{g}</option>)}
      </Select>
      <RemoveBtn
        onClick={() => removeCourse(semesterId, course.id)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTimes />
      </RemoveBtn>
    </Row>
  );
};

export default CourseRow;
