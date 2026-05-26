/**
 * College Admin Types
 * Types and interfaces for college administrators managing their college profiles
 */

/** College Admin Interface - represents a college administrator in the system */
export interface CollegeAdmin {
    id: string;
    collegeId: string;
    email: string;
    name: string;
    phone?: string;
    isVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/** College Admin Login Response */
export interface CollegeAdminLoginResponse {
    success: boolean;
    message: string;
    token?: string;
    admin?: CollegeAdmin;
}

/** College Admin Session - returned after successful authentication */
export interface CollegeAdminSession {
    collegeAdminId: string;
    collegeId: string;
    email: string;
}
