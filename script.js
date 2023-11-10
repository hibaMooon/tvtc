document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.course-grade-select').addEventListener('input', function() {
    setNumericGrade(this);
  });
});

function setNumericGrade(selectElement) {
  const tableRow = selectElement.parentNode.parentNode;
  const gradeInputElement = tableRow.querySelector('.course-grade');
  switch (selectElement.value) {
    case '5':
      gradeInputElement.value = '95';
      break;
    case '4.75':
      gradeInputElement.value = '90';
      break;
    case '4.5':
      gradeInputElement.value = '85';
      break;
    case '4':
      gradeInputElement.value = '80';
      break;
    case '3.5':
      gradeInputElement.value = '75';
      break;
    case '3':
      gradeInputElement.value = '70';
      break;
    case '2.5':
      gradeInputElement.value = '65';
      break;
    case '2':
      gradeInputElement.value = '60';
      break;
    default:
      gradeInputElement.value = '';
  }
  calculatePoints(tableRow.querySelector('.course-hours'));
  calculateGPA();
}

function calculateGrade(gradeInput) {
  const tableRow = gradeInput.parentNode.parentNode;
  const gradeSelectElement = tableRow.querySelector('.course-grade-select');
  const coursePointsElement = tableRow.querySelector('.course-points');
  const gradeValue = parseFloat(gradeInput.value);

  if (isNaN(gradeValue)) {
    gradeSelectElement.value = '';
    coursePointsElement.textContent = '0';
  } else if (gradeValue >= 95) {
    gradeSelectElement.value = '5';
  } else if (gradeValue >= 90) {
    gradeSelectElement.value = '4.75';
  } else if (gradeValue >= 85) {
    gradeSelectElement.value = '4.5';
  } else if (gradeValue >= 80) {
    gradeSelectElement.value = '4';
  } else if (gradeValue >= 75) {
    gradeSelectElement.value = '3.5';
  } else if (gradeValue >= 70) {
    gradeSelectElement.value = '3';
  } else if (gradeValue >= 65) {
    gradeSelectElement.value = '2.5';
  } else if (gradeValue >= 60) {
    gradeSelectElement.value = '2';
  } else {
    gradeSelectElement.value = '1';
  }

  calculatePoints(tableRow.querySelector('.course-hours'));
  calculateGPA();
}

function calculatePoints(inputElement) {
  const tableRow = inputElement.parentNode.parentNode;
  const gradeSelectElement = tableRow.querySelector('.course-grade-select');
  const selectedValue = parseFloat(gradeSelectElement.value);
  const coursePointsElement = tableRow.querySelector('.course-points');
  const hoursValue = parseFloat(inputElement.value);
  const points = selectedValue * hoursValue || 0;
  coursePointsElement.textContent = points.toFixed(2);
  calculateGPA();
}

function calculateGPA() {
  const courseRows = document.querySelectorAll('table tr:not(:first-child)');
  let totalPoints = 0;
  let totalHours = 0;
  let totalGrades = 0;
  courseRows.forEach((row) => {
    const points = parseFloat(row.querySelector('.course-points').textContent);
    const hours = parseFloat(row.querySelector('.course-hours').value);
    const grade = parseFloat(row.querySelector('.course-grade-select').value);
    if (!isNaN(hours)) {
      totalHours += hours;
    }
    if (!isNaN(points)) {
      totalPoints += points;
    }
    if (!isNaN(grade)) {
      totalGrades += grade;
    }
  });

  const gpaResultElement = document.getElementById('gpa');
  const totalHoursElement = document.getElementById('total-hours');
  const totalPointsElement = document.getElementById('total-points');
  const gpaLetterElement = document.getElementById('gpa-letter');  // change this id to 'gpa-letter'

  const gpa = (totalPoints / totalHours).toFixed(2);
  const averageGrade = (totalGrades / courseRows.length).toFixed(2);

  gpaResultElement.textContent = isNaN(gpa) ? '0' : gpa;
  totalHoursElement.textContent = totalHours;
  totalPointsElement.textContent = totalPoints;
  gpaLetterElement.textContent = isNaN(averageGrade) ? 'N/A' : getGradeLetter(averageGrade); // set textContent for gpaLetterElement
calculateCGPA();

}

function getGradeLetter(averageGrade) {
  averageGrade = parseFloat(averageGrade);
    if (averageGrade >= 4.5) {
    return "ممتاز";
  } else if (averageGrade >= 3.75) {
    return "جيد جدا";
  } else if (averageGrade >= 2.75) {
    return "جيد";
  } else if (averageGrade >= 2) {
    return "مقبول";
  } else {
    return "راسب";
  }
}


function addNewCourse() {
  const tableBody = document.querySelector('table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input type="text" class="course-name" /></td>
    <td><input type="number" class="course-grade" min="0" max="100" oninput="calculateGrade(this)" /></td>
    <td><input type="number" class="course-hours" oninput="calculatePoints(this)" /></td>
    <td>
      <select class="course-grade-select" oninput="setNumericGrade(this)">
        <option value=""></option>
        <option value="5">A+</option>
        <option value="4.75">A</option>
        <option value="4.5">B+</option>
        <option value="4">B</option>
        <option value="3.5">C+</option>
        <option value="3">C</option>
        <option value="2.5">D+</option>
        <option value="2">D</option>
        <option value="1">F</option>
      </select>
    </td>
    <td class="course-points">0</td>`;
  tableBody.appendChild(newRow);
}

function calculateCGPA() {
  const previousGpaElement = document.getElementById('previous-gpa');
  const previousHoursElement = document.getElementById('previous-hours');
  const previousGpa = parseFloat(previousGpaElement.value);
  const previousHours = parseFloat(previousHoursElement.value);
  const totalHoursElement = document.getElementById('total-hours');
  const totalPointsElement = document.getElementById('total-points');
  const totalHoursAllElement = document.getElementById('total-hours-all');
  const totalPointsAllElement = document.getElementById('total-points-all');
  const cgpaElement = document.getElementById('cgpa');

  const totalHours = parseFloat(totalHoursElement.textContent);
  const totalPoints = parseFloat(totalPointsElement.textContent);
  const totalHoursAll = totalHours + (isNaN(previousHours) ? 0 : previousHours);
  const totalPointsAll = totalPoints + (isNaN(previousGpa) ? 0 : previousGpa * previousHours);
  
  const cgpa = (totalPointsAll / totalHoursAll).toFixed(2);

  totalHoursAllElement.textContent = totalHoursAll;
  totalPointsAllElement.textContent = totalPointsAll;
  cgpaElement.textContent = isNaN(cgpa) ? '0' : cgpa;
}
