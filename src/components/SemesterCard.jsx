import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGPA } from '../context/GPAContext';
import { calculateSemesterGPA } from '../utils/gpaCalculations';
import { FaPlus, FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import CourseRow from './CourseRow';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: var(--card-radius);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const AddButton = styled(motion.button)`
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255,255,255,0.03);
    border: 1px dashed rgba(255,255,255,0.2);
    border-radius: 12px;
    color: rgba(255,255,255,0.7);
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        background: rgba(255,255,255,0.1);
        border-color: var(--primary-color);
        color: white;
    }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SemesterTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditInput = styled.input`
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    font-size: 1.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    width: 200px;
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const GPAVal = styled.span`
  background: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
`;

const IconButton = styled(motion.button)`
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.6);
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: rgba(255,255,255,0.1);
        color: white;
    }
    
    &.delete {
        &:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
    }
`;

const CourseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;



const SemesterCard = ({ semester, index }) => {
    const { t } = useTranslation();
    const { removeSemester, updateSemesterName, addCourse, removeCourse } = useGPA();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(semester.name);

    const handleNameSave = () => {
        updateSemesterName(semester.id, name);
        setIsEditing(false);
    };

    const semesterGPA = calculateSemesterGPA(semester.courses);

    return (
        <Card
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
        >
            <CardHeader>
                <TitleSection>
                    {isEditing ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <EditInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                                autoFocus
                            />
                            <IconButton onClick={handleNameSave}><FaCheck /></IconButton>
                        </div>
                    ) : (
                        <SemesterTitle onClick={() => setIsEditing(true)}>
                            {semester.name}
                            <FaPen size={12} style={{ opacity: 0.5 }} />
                        </SemesterTitle>
                    )}
                </TitleSection>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <GPAVal>{t('semester_gpa')}: {semesterGPA}</GPAVal>
                    <IconButton
                        className="delete"
                        onClick={() => removeSemester(semester.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaTrash />
                    </IconButton>
                </div>
            </CardHeader>

            <CourseList>
                <AnimatePresence>
                    {semester.courses.map((course) => (
                        <CourseRow
                            key={course.id}
                            course={course}
                            semesterId={semester.id}
                        />
                    ))}
                </AnimatePresence>
            </CourseList>

            <AddButton
                onClick={() => addCourse(semester.id)}
                whileTap={{ scale: 0.98 }}
            >
                <FaPlus style={{ marginRight: '0.5rem' }} /> {t('add_course')}
            </AddButton>
        </Card>
    );
};

export default SemesterCard;
