import { Temporal } from "@js-temporal/polyfill";
export interface Course{
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus = | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
                           | {status: "PUBLISHED", publishedAt: Temporal.Instant; syllabus: string}
                           | { status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate }
                           | { status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number}
                           | { status: "CANCELED"; canceledAt: Temporal.Instant; reason: string }
        

export function describeCourse(course: CourseStatus): string {
    switch (course.status){
        case "DRAFT":
            return `Course is in draft, created by ${course.createdBy}`;
        case "PUBLISHED":
            return `Course published on ${course.publishedAt } with syllabus: ${course.syllabus}`;
        case "ACTIVE":
            return `Course is active with ${course.enrolledCount} students enrolled since ${course.startDate}`;
        case "ARCHIVED":
            return `Course is archived on ${course.archivedAt} with ${course.finalEnrollmentCount} total enrollments`;
        case "CANCELED":
            return `Course is canceled on ${course.canceledAt} due to ${course.reason}`;
    }
}