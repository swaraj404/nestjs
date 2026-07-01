import { Controller, Get, Param, Query,Post, Body, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getUsers(@Query('name') name: string): unknown{
        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUserById(@Param('id') id: string): unknown{
        return this.userService.findOneUserById(Number(id));
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): unknown{
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto): unknown{
        return this.userService.updateUser(Number(id), UpdateUserDto);
    }

    @Put(':id')
    deleteUser(@Param('id') id: string): unknown{
        return this.userService.deleteUser(Number(id));
    }
    

    //GET /user
    // @Get()
    // getUser(){
    //     return [
    //         {id: 1, name: 'Swaraj Pawar'},
    //         {id: 2, name: 'Rudra Joshi'},
    //     ];
    // }

    //Query Parameters
    // @Get()
    // getUser(@Query('name') name: string) {
    //     return [
    //         {id: 1, name: name || 'Swaraj Pawar'},
    //         {id: 2, name: 'Rudra Joshi'},
    //     ].filter(user => !name || user.name.toLowerCase().includes(name.toLowerCase()));
    // }
  
    //Param parameters
    // @Get(':id')
    // getUserById(@Param('id') id: string) {
    //     return {id, name: 'Swaraj Pawar'}; }

    // @Post() //POST /user
    // createUser(@Body() CreateUserDto: CreateUserDto) {
    //     return{ data: CreateUserDto, message: 'User created successfully'};
    // }

    // @Put(':id') //PUT /user/:id
    // updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return {id, ...updateUserDto, message: 'User updated successfully'};
    // }
}
