import React, { useState } from 'react';

function Calc() {

    const [mode, setMode] = useState('semester');
    const [courses, setCourses] = useState([{ name: '', grade: '', credit: '' }]);
    const [gpa, setGpa] = useState(null);
    const [pastCredits, setPastCredits] = useState('');
    const [pastGpa, setPastGpa] = useState('');

    const gradePoints = {
        'A+': 4.0,
        'A': 3.75,
        'B+': 3.3,
        'B': 3.0,
        'C+': 2.3,
        'C': 2.0,
        'D+': 1.3,
        'D': 1.0,
        'F': 0
    };

    const handleInputChange = (index, field, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value;
        setCourses(updatedCourses);
    };

    const addCourse = () => {
        setCourses([...courses, { name: '', grade: '', credit: '' }]);
    };

    const removeCourse = (index) => {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
    };

    const resetCourses = () => {
        setCourses([{ name: '', grade: '', credit: '' }]);
        setGpa(null);
        setPastCredits('');
        setPastGpa('');
    };

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const points = gradePoints[course.grade.toUpperCase()];
            const credits = parseFloat(course.credit);

            if (!isNaN(points) && !isNaN(credits)) {
                totalPoints += points * credits;
                totalCredits += credits;
            }
        });

        if (mode === 'cumuliative') {
            const pastC = parseFloat(pastCredits);
            const pastG = parseFloat(pastGpa);

            if (!isNaN(pastC) && !isNaN(pastG)) {
                totalPoints += pastC * pastG;
                totalCredits += pastC;
            }
        }

        const calculatedGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
        setGpa(calculatedGPA);
    };

    return (
        <div className='container'>
            <div className='card bg-dark text-white border-light p-4 shadow mb-4'>
                <h2 className='text-primary'>GPA Calculator</h2>

                <div className='mb-3'>
                    <label className='form-label me-3'>Choose Mode: </label>
                    <div className='form-check form-check-inline'>
                        <input className='form-check-input' type='radio' name='mode' value='semester' checked={mode === 'semester'} onChange={() => setMode('semester')} />
                        <label className='form-check-label'>Semester</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className='form-check-input' type='radio' name='mode' value='cumuliative' checked={mode === 'cumuliative'} onChange={() => setMode('cumuliative')} />
                        <label className='form-check-label'>Cumuliative</label>
                    </div>
                </div>

                {/* Additional inputs for cumulative mode */}
                {mode === 'cumuliative' && (
                    <div className='row mb-4'>
                        <div className='col-md-6'>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Past Credit Hours'
                                value={pastCredits}
                                onChange={(e) => setPastCredits(e.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <input
                                type='number'
                                step='0.01'
                                className='form-control'
                                placeholder='Past GPA'
                                value={pastGpa}
                                onChange={(e) => setPastGpa(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {courses.map((course, index) => (
                    <div key={index} className='row mb-3'>
                        <div className='col-md-4'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Course Name'
                                value={course.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className='col-md-4'>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Credit Hours'
                                value={course.credit}
                                onChange={(e) => handleInputChange(index, 'credit', e.target.value)}
                            />
                        </div>
                        <div className='col-md-4'>
                            <select
                                className='form-select'
                                value={course.grade}
                                onChange={(e) => handleInputChange(index, 'grade', e.target.value)}>
                                <option value=''>Select Grade</option>
                                {Object.keys(gradePoints).map((grade) => (
                                    <option key={grade} value={grade}>{grade}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <div className='d-flex gap-2 mb-3'>
                    <button className='btn btn-primary' onClick={addCourse}>Add Course</button>
                    <button className='btn btn-danger' onClick={() => removeCourse(courses.length - 1)} disabled={courses.length <= 1}>Remove Last Course</button>
                    <button className='btn btn-success' onClick={calculateGPA}>Calculate GPA</button>
                    <button className='btn btn-secondary' onClick={resetCourses}>Reset</button>
                </div>

                {gpa !== null && (
                    <div className='alert alert-info'>
                        <h4 className='mb-0'>Your {mode.charAt(0).toUpperCase() + mode.slice(1)} GPA: {gpa}</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calc;
