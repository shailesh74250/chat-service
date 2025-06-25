import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './shared/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import loggerConfig from './config/logger.config';
import { swaggerConfig } from './config/swagger.config';
import { ChatController } from './modules/chat/api/rest/chat.controller';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [swaggerConfig, databaseConfig, loggerConfig],
    }),
    ChatModule,
  ],
  controllers: [AppController, ChatController],
  providers: [AppService],
})
export class AppModule {}
