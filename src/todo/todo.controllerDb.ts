import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TodoModel } from './model/todo.model';

import { Request } from 'express';

import { UpdateTodoDto } from './dto/update-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { UpdateResult } from 'typeorm';
import { SearchDto } from './dto/search.dto';
import { DateIntervalDto } from '../common/dto/date-interval.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleGuard } from '../auth/guard/role/role.guard';
@Controller({
  path: 'todo',
  version: '2',
})
@Roles('admin')
@UseGuards(AuthGuard('jwt'))
export class TodoControllerDb {
  constructor(private todoService: TodoService) {}
  @Get('')
  @Roles('user')
  @UseGuards(RoleGuard)
  getTodos(@Query() searchCriteria: SearchDto): Promise<Todo[]> {
    return this.todoService.getTodos(searchCriteria);
  }
  @Get('qb')
  @UseGuards(RoleGuard)
  @Roles('user')
  getQbTodos(@Query() searchCriteria: SearchDto): Promise<Todo[]> {
    return this.todoService.getQbTodos(searchCriteria);
  }
  @Get('stats')
  getStatsTodos(@Query() dateIntervalDto: DateIntervalDto) {
    return this.todoService.getStats(dateIntervalDto);
  }
  @Get(':id')
  getTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTodo(id);
  }

  @Post()
  @UseGuards(RoleGuard)
  create(@Body() addTodoDto: AddTodoDto, @GetUser() user: User): Promise<Todo> {
    return this.todoService.addTodo(addTodoDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateTodo(
    @Body() updatedTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.updateTodo(updatedTodoDto, id);
  }

  @Patch('/restore/:id')
  restoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.restoreTodo(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.deleteTodo(id);
  }

  /* @Get('all')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Get(':id?')
  getTodo(@Param('id') id: string = '145'): TodoModel {
    console.log(id);
    return this.todoService.getTodo(id);
  }



  @Patch(':id')
  @UseFilters(CustomFilter)
  updateTodo(
    @Body() updatedTodoDto: UpdateTodoDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const userId = request['userId'];
    console.log({ userId });

    return this.todoService.updateTodo(updatedTodoDto, id, userId);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.todoService.deleteTodo(id, userId);
  }
} */
}
function UseGuard(): (
  target: typeof TodoControllerDb,
) => void | typeof TodoControllerDb {
  throw new Error('Function not implemented.');
}
