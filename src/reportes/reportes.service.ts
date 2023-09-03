import { AsignaturaCurso, Curso, EstablecimientoSede } from '@app/typeorm/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportesService {

    constructor(
        @InjectRepository(EstablecimientoSede) private establecimientoSedeRepo: Repository<EstablecimientoSede>,
        // @InjectRepository(Curso) private cursoRepository: Repository<Curso>
    ){}
    async getCursosRange(range: string): Promise<any[]>{
        
        const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
        .select('es.id', 'id')
        .addSelect('es.nombre', 'Establecimiento')
        .addSelect('COUNT(*)', 'Cursos')
        .leftJoin(Curso, 'c', 'es.id = c.sedeid')
        .where('c.created_at > :fecha', { fecha: range })
        .groupBy('es.nombre, es.id')
        .orderBy('es.id', 'ASC');
  
        return await queryBuilder.getRawMany();
    }

    async getCursos(): Promise<any[]>{
        
        const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
        .select('es.id', 'id')
        .addSelect('es.nombre', 'Establecimiento')
        .addSelect('COUNT(*)', 'Cursos')
        .leftJoin(Curso, 'c', 'es.id = c.sedeid')
        .groupBy('es.nombre, es.id')
        .orderBy('es.id', 'ASC');
  
        return await queryBuilder.getRawMany();
    }

    async getAsignaturas(): Promise<any[]>{

      const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
      .select('es.id', 'id')
      .addSelect('es.nombre', 'Establecimiento')
      .addSelect('COUNT(*)', 'Asignaturas')
      .leftJoin(AsignaturaCurso, 'ac', 'es.id = ac.sede_id')
      .groupBy('es.nombre, es.id')
      .orderBy('es.id', 'ASC');

      return await queryBuilder.getRawMany();
    }

    async getAsignaturasRange(range): Promise<any[]>{

        const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
        .select('es.id', 'id')
        .addSelect('es.nombre', 'Establecimiento')
        .addSelect('COUNT(*)', 'Asignaturas')
        .leftJoin(AsignaturaCurso, 'ac', 'es.id = ac.sede_id')
        .where('c.created_at > :fecha', { fecha: range })
        .groupBy('es.nombre, es.id')
        .orderBy('es.id', 'ASC');
  
        return await queryBuilder.getRawMany();
      }
}

