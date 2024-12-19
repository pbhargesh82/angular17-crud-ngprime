import { Person } from "@config/model";
import { faker } from "@faker-js/faker";

export const generatePeopleData = (count: number): Person[] =>
    Array.from({ length: count }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            firstName,
            middleName: faker.person.middleName(),
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number({ style: 'international' }),
            birthdate: faker.date.birthdate({ mode: 'age', min: 18, max: 65 }),
            bio: faker.person.bio(),
            sexType: faker.person.sexType(),
            company: faker.company.name(),
            // jobTitle: faker.person.jobTitle(),
            jobType: faker.person.jobType(),
            avatar: faker.image.avatar(),
            status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
        };
    });

export const generatedData = generatePeopleData(100);