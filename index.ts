import { Temporal } from "@js-temporal/polyfill";
import type { Student } from "./models/student.model.js";
import  { isStudent } from "./models/student.model.js";
import { parseStudent } from "./models/student.model.js";
import type {AssesmentItem} from "./models/assesment.model.js";
import {calculateGrade} from "./models/assesment.model.js";
import { describeEnrollment, type EnrollmentStatus } from "./models/enrollment.model.js";
import { describeCourse, type Course, type CourseStatus } from "./models/course.model.js";
import { renderApiResponse, type ApiResponse } from "./models/api-response.model.js";
const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant()
};

console.log(student.gpa?.toFixed(2) ?? "Not yet graded");

// function processStudent(data: any) {
//     console.log(`GPA: ${data.gpa?.toFixed(2)}`);
// }
function processStudent(raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";

    console.log(`Student: ${raw.name}, GPA: ${gpaDisplay}`);
} else {
    console.error("Invalid student data");
}

}
processStudent({
    id: "STU-002",
    name: "Yonas Alemu",
    // enrollmentDate: Temporal.Now.instant(),
    gpa: 3.8
});
// processStudent(42);  // prints Invalid student data

console.log(parseStudent({id:"STU-003",name:"Negede",}))

// console.log(parseStudent({id:42, name: "Negede"}))

const quiz: AssesmentItem = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswer: 8,
    totalQuestions: 10
}

const lab: AssesmentItem = {
    id: "LAB-001",
    kind: "lab",
    title: "REST API Project",
    functionalityScore: 85,
    codeQualityScore: 90
}
console.log(`Quiz Grade: ${calculateGrade(quiz)}%`);
console.log(`Lab Grade: ${calculateGrade(lab)}%`);
// quiz.id = "QUIZ-002"; // Error: Cannot assign to 'id' because it is a read-only property.


interface EnrollmentBad {
    isPending: boolean;
    isApproved: boolean;
    isActive: boolean;
    isCompleted: boolean;
    isDropped: boolean;
}

// Step 3 Test and Break It
const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101"
}
console.log(describeEnrollment(pending));

const active: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 25,
    startDate: Temporal.PlainDate.from("2026-09-01")
}
console.log(describeCourse(active));


// Exercise 6: Reusable API Response (Generics)

// The situation: Every TMS page fetches data from the API. Each fetch has the same
// lifecycle: loading, then either success with data or error with a message. Writing a
// separate response type for students, courses, and enrollments violates DRY.

// In M1, you used C# generics like List<Student> and Task<Student>. TypeScript generics
// work the same way youwrite the wrapper once and fill in the data type when you use it.
// Look at these two types. What is the same? What is different?
// // Before generics repetitive
// type StudentResponse =
// | { status: "loading" }
// | { status: "success"; data: Student; fetchedAt: Temporal.Instant }
// | { status: "error"; message: string; statusCode: number };
// type CourseListResponse =
// | { status: "loading" }
// | { status: "success"; data: Course[]; fetchedAt: Temporal.Instant }
// | { status: "error"; message: string; statusCode: number };
// The structure is identical. Only the data type changes. A generic eliminates the
// duplication.
// Decision rule (use this in real projects):
//  Usegenerics whenyouhavea reusable wrapper that works with multiple data
// types (API responses, paginated lists, cache entries).
//  DoNOTusegenericswhenafunctiononlyever works with onetype.
// sortStudentsByGpa(students: Student[]) is clearer than sort<T>(items: T[]) when T is
// always Student.
// Trade-off you should know: C# generics survive to runtime the CLR knows the type and
// you can use typeof(T). TypeScript generics are erased at compile time. The JavaScript
// output has no concept of T. If you need runtime type checking, combine generics with a
// type guard the generic handles compile-time safety, the guard handles runtime
// validation.
// Step 1 Define the Generic
// Create models/api-response.model.ts:

// STEP 3 Test and Break It
const studentRes: ApiResponse<Student> = {
    status: "success",
    data: {
        id: "STU-004",
        name: "Lily Chen",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.9
    },
    fetchedAt: Temporal.Now.instant()
};
    
console.log(renderApiResponse(studentRes, (student) => `Student: ${student.name}, GPA: ${student.gpa?.toFixed(2) ?? "N/A"}`));

// now test with a d/f data type:
const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        { id: "CRS-101", title: "Intro to Programming", capacity: 30, startDate: Temporal.PlainDate.from("2026-09-01") },
        
    ],
    fetchedAt: Temporal.Now.instant()
}
console.log(renderApiResponse(courseListRes, (courses) => courses.map(c => c.title).join(", ")));