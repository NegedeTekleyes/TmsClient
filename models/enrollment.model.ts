import { Temporal } from "@js-temporal/polyfill";

export interface EnrollmentRecord {
readonly studentId: string;
readonly courseCode: string;
enrolledAt: Temporal.Instant;
}

export type EnrollmentStatus = | { status: "PENDING"; requestedAt: Temporal.Instant; studentId: string; courseId: string }
| { status: "APPROVED"; approvedAt: Temporal.Instant; studentId: string; courseId: string }
| { status: "ACTIVE"; startDate: Temporal.PlainDate; currentGrade?: number }
| { status: "COMPLETED"; finalGrade: number; completedAt: Temporal.Instant }
| { status: "DROPPED"; reason: string; droppedAt: Temporal.Instant };   

// Step 2 Write the Exhaustive Handler

export function describeEnrollment(enrollment: EnrollmentStatus): string {
    switch (enrollment.status){
        case "PENDING":
            return `Awating approval since ${enrollment.requestedAt} `;
            case "APPROVED":
                return `Approved by ${enrollment.approvedAt}`;
            case "ACTIVE":
                return enrollment.currentGrade !== undefined
                ? `In progress grade so far: {$enrollment.currentGrade}`
                : `In progress, no grade yet`;
                case "COMPLETED":
                    return `Completed with grade ${enrollment.finalGrade} on ${enrollment.completedAt}`;
                    case "DROPPED":
                        return `Dropped on ${enrollment.droppedAt} due to ${enrollment.reason}`;
                        default:
                            const _check: never = enrollment;
                            throw new Error(`Unhandled status: ${JSON.stringify(_check)}`);
    }
}

