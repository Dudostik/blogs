interface StudentData {
  [id: number]: {
    name: string;
    age: number;
    courses: { courseName: string; grade: number }[];
  };
}

export function createStudentData(
  names: string[],
  ages: number[],
  courses: string[][],
  grades: number[][]
): StudentData {
  const lengths = new Set<number>();
  [names.length, ages.length, courses.length, grades.length].forEach(length => lengths.add(length))

  if (lengths.size !== 1) {
    throw new Error('Data arrays must have the same length')
  }

  const length = names.length;
  const student: StudentData = {}


  for (let i = 0; i < length; i++) {
    student[i + 1] = {
      name: names[i],
      age: ages[i],
      courses: courses[i].map((courseName, rate) => ({
        courseName,
        grade: grades[i][rate]
      }))
    }
  }

  return student;
}

