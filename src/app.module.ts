import { Module } from '@nestjs/common';
import { GameModule } from './game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './database/db.config';

@Module({
  imports: [
    // STEP 0: add TypeOrmModule.forRoot({ ...dbConfig, autoLoadEntities: true, synchronize: false })
    TypeOrmModule.forRoot({
      ...dbConfig,
      autoLoadEntities: true,
      synchronize: false
    }),
    GameModule,
  ],
})
export class AppModule {}
