export interface Person {
    id?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName?: string;
    email: string;
    phone: string;
    birthdate: Date | string;
    bio: string;
    sexType: string;
    // zodiacSign: string;
    company: string;
    // jobTitle: string;
    jobType: string;
    status: string;
    action?: {}[];
}