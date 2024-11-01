interface StudentData {
  [id: number]: {
    name: string;
    age: number;
    courses: { courseName: string; grade: number }[];
  };
}

// Требуется реализовать:
// Функция createStudentData:

// Принимает массивы names, ages, courses и grades.
// Возвращает объект, где каждый студент представлен по уникальному идентификатору (например, id: 1, id: 2 и т.д.).
// Каждый студент должен включать следующие поля:
// name — имя студента.
// age — возраст студента.
// courses — массив объектов, представляющий информацию о каждом курсе, включая:
// courseName — название курса.
// grade — оценка студента за этот курс.
// Если данные в массивах не совпадают по длине, выбрасывается ошибка с сообщением: "Data arrays must have the same length".

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

// {
//   1: {
//     name: "Alice",
//     age: 20,
//     courses: [
//       { courseName: "Math", grade: 85 },
//       { courseName: "Physics", grade: 90 }
//     ]
//   },
//   2: {
//     name: "Bob",
//     age: 22,
//     courses: [
//       { courseName: "Biology", grade: 88 }
//     ]
//   },
//   3: {
//     name: "Charlie",
//     age: 19,
//     courses: [
//       { courseName: "History", grade: 70 },
//       { courseName: "Literature", grade: 95 }
//     ]
//   }
// }

