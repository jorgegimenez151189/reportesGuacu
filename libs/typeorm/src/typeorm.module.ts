
import { Module, DynamicModule } from '@nestjs/common'
import { TypeOrmCoreModule } from './typeorm.core.module'
@Module({})

export class TypeOrmModule {
  static forRoot (opt: any): DynamicModule {
    return {
      module: TypeOrmModule,
      imports: [TypeOrmCoreModule.forRoot(opt)]
    }
  }
}
