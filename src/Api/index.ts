import { faker } from "@faker-js/faker";

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

let users: User[] = [];

for (let i = 1; i <= 100; i++) {
    users.push({
        id: i,
        email: (faker as any).internet.email(),
        firstName: (faker as any).person.firstName(),
        lastName: (faker as any).person.lastName(),
        avatar: (faker as any).image.avatar(),
    });
}

interface PagedResponse<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[];
}

export async function listAllUsers(page: number = 1, perPage: number = 10): Promise<PagedResponse<User>> {
    const waitTime = Math.floor(Math.random() * 1000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
        page,
        per_page: perPage,
        total: users.length,
        total_pages: Math.ceil(users.length / perPage),
        data: users.slice(start, end),
    };
}

interface GetUserResponse {
    data: {
        status: 'success';
        user: User;
    } | {
        status: 'error';
        message: string;
    };
}

export async function getUser(userId: number): Promise<GetUserResponse> {
    const waitTime = Math.floor(Math.random() * 1000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const foundUser = users.find((user) => user.id === userId);

    return foundUser
        ? { data: { status: 'success', user: foundUser } }
        : { data: { status: 'error', message: 'User not found' } };
}

interface CrudResponse<T> {
    data: {
        status: 'success';
        value?: T;
    } | {
        status: 'error';
        message: string;
    };
}
export async function createUser(newUser: User): Promise<CrudResponse<User>> {
    const waitTime = Math.floor(Math.random() * 2000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const newId = users.length + 1;
    const user = { ...newUser, id: newId };
    users.unshift(user);

    return { data: { status: 'success' } };
}

export async function updateUser(userId: Number, updatedUser: Partial<User>): Promise<CrudResponse<User>> {
    const waitTime = Math.floor(Math.random() * 2000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        return { data: { status: 'success' } };
    } else {
        return { data: { status: 'error', message: 'User not found' } };
    }
}

export async function deleteUser(userId: Number): Promise<CrudResponse<User>> {
    const waitTime = Math.floor(Math.random() * 2000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return { data: { status: 'success' } };
    } else {
        return { data: { status: 'error', message: 'User not found' } };
    }
}

interface LoginResponse {
    data: {
        status: 'success';
        user: User;
    } | {
        status: 'error';
        message: string;
    };
}

export async function login(email: string): Promise<LoginResponse> {
    const waitTime = Math.floor(Math.random() * 3000) + 1;
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    const matchingUser = users.find((user) => user.email === email);
    
    if (matchingUser) {
        return {
            data: {
                status: 'success',
                user: matchingUser,
            },
        };
    } else {
        return {
            data: {
                status: 'error',
                message: 'Invalid email',
            },
        };
    }
}

export async function deleteMultipleUsers(userIds: number[]): Promise<CrudResponse<User[]>> {
    const deletedUsers: User[] = [];
    const errors: string[] = [];
  
    for (const userId of userIds) {
      try {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          deletedUsers.push(users.splice(userIndex, 1)[0]);
        } else {
          errors.push(`User with ID ${userId} not found`);
        }
      } catch (error) {
        errors.push(`Error deleting user with ID ${userId}: ${error.message}`);
      }
    }
  
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 2000) + 1));
  
    if (errors.length > 0) {
      return {
        data: {
          status: 'error',
          message: errors.join('\n'),
        },
      };
    } else {
      return {
        data: {
          status: 'success',
          value: deletedUsers,
        },
      };
    }
  }
  