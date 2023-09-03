import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturaCurso, Curso, EstablecimientoSede } from '@app/typeorm/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstablecimientoSede,
      Curso,
      AsignaturaCurso
    ])
  ],
  controllers: [ReportesController],
  providers: [ReportesService]
})
export class ReportesModule {}
