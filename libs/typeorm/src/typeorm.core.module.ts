/*
https://docs.nestjs.com/modules
*/

import { Module, DynamicModule } from '@nestjs/common'
import { PostgresModule } from './postgres.module'

@Module({})
export class TypeOrmCoreModule {
  static forRoot (opt: any): DynamicModule {
    return {
      global: true,
      module: TypeOrmCoreModule,
      imports: [PostgresModule.forRoot(opt)],

    }
  }
}
