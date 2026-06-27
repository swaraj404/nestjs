import { Controller, Get, Param, Query,Post, Body, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    //GET /user
    // @Get()
    // getUser(){
    //     return [
    //         {id: 1, name: 'Swaraj Pawar'},
    //         {id: 2, name: 'Rudra Joshi'},
    //     ];
    // }

    //Query Parameters
    @Get()
    getUser(@Query('name') name: string) {
        return [
            {id: 1, name: name || 'Swaraj Pawar'},
            {id: 2, name: 'Rudra Joshi'},
        ].filter(user => !name || user.name.toLowerCase().includes(name.toLowerCase()));
    }
  
    //Param parameters
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return {id, name: 'Swaraj Pawar'};
    }

    @Post() //POST /user
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return{ data: CreateUserDto, message: 'User created successfully'};
    }

    @Put(':id') //PUT /user/:id
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return {id, ...updateUserDto, message: 'User updated successfully'};
    }
}
