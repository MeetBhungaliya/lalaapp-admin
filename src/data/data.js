import { faker } from "@faker-js/faker"

const usersData = Array.from({ length: 20 }).map((_, index) => ({
    id: faker.database.mongodbObjectId(),
    profile: faker.image.personPortrait({ size: 128 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
   
}))

export { usersData }    