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
            bio: faker.person.bio(),
            sexType: faker.person.sexType(),
            zodiacSign: faker.person.zodiacSign(),
            jobTitle: faker.person.jobTitle(),
            jobType: faker.person.jobType(),
            avatar: faker.image.avatar()
        };
    });

export const generatedData = generatePeopleData(10);