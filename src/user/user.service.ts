import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';

interface User {
    id: number;
    name: string;
    email: string;
}
@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        { id: 1, name: 'Swaraj Pawar', email: 'swaraj.pawar@example.com' },
        { id: 2, name: 'Rudra Joshi', email: 'rudra.joshi@example.com' },
    ];

    findAllUsers(name: string= ' ') {
        this.logger.log(`Fetching users with name filter: ${name}`);
        return this.users.filter((user) => !name || user.name.toLowerCase().includes(name.toLowerCase()));
    }

    findOneUserById(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user){
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        this.logger.log(`Creating user: ${dto.name}`);
        const newUser: User = {
            id: this.users.length + 1,
            email: '', ...dto
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updateUserDto: Partial<CreateUserDto>) {
        this.logger.log(`Updating user with ID: ${id}`);
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex];
    }

    deleteUser(id: number) {
        this.logger.log(`Deleting user with ID: ${id}`);
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        const deletedUser = this.users.splice(userIndex, 1);
        return deletedUser[0];
    }
}
    

//Dependency chain looks like:
//UserController -> needs UserService
//UserService -> needs LoggerService
//Nest -> creates and connects everything automatically.
