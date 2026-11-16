import { Module } from '@nestjs/common';
import { GameModule } from './game.module';

@Module({
  imports: [
    // STEP 0: add TypeOrmModule.forRoot({ ...dbConfig, autoLoadEntities: true, synchronize: false })
    GameModule,
  ],
})
export class AppModule {}
