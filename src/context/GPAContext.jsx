import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GPAContext = createContext();

export const useGPA = () => useContext(GPAContext);

const INITIAL_SEMESTER = {
    id: uuidv4(),
    name: 'Semester 1',
    courses: [
        { id: uuidv4(), name: '', credits: 3, grade: 'A' },
        { id: uuidv4(), name: '', credits: 3, grade: 'B+' },
        { id: uuidv4(), name: '', credits: 3, grade: 'A-' },
    ],
};

export const GPAProvider = ({ children }) => {
    const [semesters, setSemesters] = useState(() => {
        const saved = localStorage.getItem('gpa-data');
        return saved ? JSON.parse(saved) : [INITIAL_SEMESTER];
    });

    const [scale, setScale] = useState(() => {
        return Number(localStorage.getItem('gpa-scale')) || 4.0;
    });

    useEffect(() => {
        localStorage.setItem('gpa-data', JSON.stringify(semesters));
    }, [semesters]);

    useEffect(() => {
        localStorage.setItem('gpa-scale', scale);
    }, [scale]);

    const addSemester = () => {
        setSemesters([...semesters, { ...INITIAL_SEMESTER, id: uuidv4(), name: `Semester ${semesters.length + 1}`, courses: [] }]);
    };

    const removeSemester = (id) => {
        setSemesters(semesters.filter(s => s.id !== id));
    };

    const updateSemesterName = (id, newName) => {
        setSemesters(semesters.map(s => s.id === id ? { ...s, name: newName } : s));
    };

    const addCourse = (semesterId) => {
        setSemesters(semesters.map(s => {
            if (s.id === semesterId) {
                return {
                    ...s,
                    courses: [...s.courses, { id: uuidv4(), name: '', credits: 3, grade: 'A' }]
                };
            }
            return s;
        }));
    };

    const removeCourse = (semesterId, courseId) => {
        setSemesters(semesters.map(s => {
            if (s.id === semesterId) {
                return {
                    ...s,
                    courses: s.courses.filter(c => c.id !== courseId)
                };
            }
            return s;
        }));
    };

    const updateCourse = (semesterId, courseId, field, value) => {
        setSemesters(semesters.map(s => {
            if (s.id === semesterId) {
                return {
                    ...s,
                    courses: s.courses.map(c => {
                        if (c.id === courseId) {
                            return { ...c, [field]: value };
                        }
                        return c;
                    })
                };
            }
            return s;
        }));
    };

    const resetData = () => {
        setSemesters([INITIAL_SEMESTER]);
        localStorage.removeItem('gpa-data');
    };

    return (
        <GPAContext.Provider value={{
            semesters,
            addSemester,
            removeSemester,
            updateSemesterName,
            addCourse,
            removeCourse,
            updateCourse,
            scale,
            setScale,
            resetData
        }}>
            {children}
        </GPAContext.Provider>
    );
};
