import { Controller, Get, Query } from '@nestjs/common';

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
}
