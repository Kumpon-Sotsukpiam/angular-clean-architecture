import { InMemoryDbService } from 'angular-in-memory-web-api';
import { faker } from '@faker-js/faker';
import { v4 as getUuid } from 'uuid'

import { Todo } from '@data/interfaces'

export class MockDbService extends InMemoryDbService {

    public createDb() {
        const todos: Todo[] = faker.helpers.multiple(this.createRandomTodo, {
            count: 5,
        });
        return { todos }
    }

    public createRandomTodo(): Todo {
        return {
            id: getUuid(),
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
        }
    }
}