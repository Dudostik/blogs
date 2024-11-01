import { expect, test } from "vitest";
import {createStudentData} from "./task" 

const names = ["Alice", "Bob", "Charlie"];
const ages = [20, 22, 19];
const courses = [["Math", "Physics"], ["Biology"], ["History", "Literature"]];
const grades = [[85, 90], [88], [70, 95]];

test('should create student data correctly', () => {
    const expectedOutput = {
    1: {
        name: "Alice",
        age: 20,
        courses: [
        { courseName: "Math", grade: 85 },
        { courseName: "Physics", grade: 90 }
        ]
    },
    2: {
        name: "Bob",
        age: 22,
        courses: [
        { courseName: "Biology", grade: 88 }
        ]
    },
    3: {
        name: "Charlie",
        age: 19,
        courses: [
        { courseName: "History", grade: 70 },
        { courseName: "Literature", grade: 95 }
        ]
    }
    };

    const result = createStudentData(names, ages, courses, grades);
    expect(result).toEqual(expectedOutput);
});
