import { Module } from '@nestjs/common';
import { ReportesModule } from './reportes/reportes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@app/typeorm';

@Module({
  imports: [
    ReportesModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(process.env),
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
