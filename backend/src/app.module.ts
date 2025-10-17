import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule, TasksModule, TeamsModule,MongooseModule.forRoot('YOUR_CONNECTION_STRING')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
