import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListModel } from './todo.model';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { TypeOrmTodoRepository } from './typeorm-todo.repository';
import { TodoListController } from './todo.controller';
import { DeleteTodoUseCase } from 'src/use-cases/todo/delete-todo.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListModel])],
  controllers: [TodoListController],
  providers: [
    {
      provide: TodoGateway,
      useClass: TypeOrmTodoRepository,
    },
    TypeOrmTodoRepository,
    {
      provide: CreateTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new CreateTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
    {
      provide: DeleteTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new DeleteTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
  ],
  exports: [TodoGateway],
})
export class TodoModule {}
