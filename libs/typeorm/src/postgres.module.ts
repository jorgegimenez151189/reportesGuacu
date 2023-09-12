/*
https://docs.nestjs.com/modules
*/

import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AsignaturaCurso, Curso, EstablecimientoSede, TemaContenidoRepositorio, UnidadTema } from './entities'
import { Actividad } from './entities/actividad.entity'
import { Unidad } from './entities/unidad.entity'
import { Programa } from './entities/programa.entity'
@Module({})
export class PostgresModule {
  static forRoot (opt: any):DynamicModule {
    return {
      module: PostgresModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: opt.DB_HOST,
          port: parseInt(opt.DB_PORT),
          database: opt.DB_NAME,
          username: opt.DB_USER,
          password: opt.DB_PASSWORD,
          entities: [
            EstablecimientoSede,
            Curso,
            AsignaturaCurso,
            Actividad,
            Unidad,
            UnidadTema,
            TemaContenidoRepositorio,
            Programa
          ],
          synchronize: false
        })],
      controllers: []
    }
  }
}
