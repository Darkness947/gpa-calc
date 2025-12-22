export const GRADE_POINTS = {
    'A+': 5.0, 'A': 4.75,
    'B+': 4.5, 'B': 4.0,
    'C+': 3.5, 'C': 3.0,
    'D+': 2.5, 'D': 2.0,
    'F': 1.0
};
// Note: Standard 5.0 scale often varies. 
// However, most common 4.0 scale: A=4, B=3, C=2, D=1, F=0.
// Common 5.0 scale: A=5, B=4, C=3, D=2, F=1.
// The user asked to remove A-, B-, etc. 
// Let's assume a standard 4.0 scale for now unless specified otherwise, but purely flat.
// actually, let's Stick to the previous map but remove the minus keys.
// Wait, usually A+ is 4.0 in 4.0 scale.
// Let's use a standard map without minuses.

export const GRADE_POINTS_4 = {
    'A+': 4.0, 'A': 3.75,
    'B+': 3.5, 'B': 3.0,
    'C+': 2.5, 'C': 2.0,
    'D+': 1.5, 'D': 1.0,
    'F': 0.0
};

// Let's provide a flexible way. 
// For now, I will use the set requested: A+, A, B+, B, C+, C, D+, D, F.
// And assign standard 4.0 weights to them.
const POINTS = {
    'A+': 4.0, 'A': 3.75,
    'B+': 3.5, 'B': 3.0,
    'C+': 2.5, 'C': 2.0,
    'D+': 1.5, 'D': 1.0,
    'F': 0.0
};

export const calculateSemesterGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
        const credits = parseFloat(course.credits) || 0;
        const points = POINTS[course.grade] || 0;

        totalPoints += points * credits;
        totalCredits += credits;
    });

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
};

export const calculateCumulativeWithPrevious = (currentSemesters, prevGPA, prevCredits) => {
    const pGPA = parseFloat(prevGPA) || 0;
    const pCredits = parseFloat(prevCredits) || 0;

    let currentPoints = 0;
    let currentCredits = 0;

    currentSemesters.forEach(semester => {
        semester.courses.forEach(course => {
            const credits = parseFloat(course.credits) || 0;
            const points = POINTS[course.grade] || 0;
            currentPoints += points * credits;
            currentCredits += credits;
        });
    });

    const totalPoints = (pGPA * pCredits) + currentPoints;
    const totalCredits = pCredits + currentCredits;

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
};

export const calculateCumulativeGPA = (semesters) => {
    return calculateCumulativeWithPrevious(semesters, 0, 0);
};
