import { Temporal } from "@js-temporal/polyfill";

export type ApiResponse<T> = | { status: "loading" }
                           | { status: "success"; data: T; fetchedAt: Temporal.Instant }
                           | { status: "error"; message: string; statusCode: number }

// Step 2 Write the Renderer
// You have nowwritten three exhaustive switch blocks (calculateGrade, describeEnrollment,
// describeCourse). This is the same pattern only the types are generic. Write the function
// body yourself:

export function renderApiResponse<T>(response: ApiResponse<T>, formatter: (data: T) => string): string {
    switch (response.status) {
        case "loading":
            return "Loading...";
        case "success":
            return formatter(response.data);
        case "error":
            return `Error: ${response.message} (Status: ${response.statusCode})`;
    }
}
