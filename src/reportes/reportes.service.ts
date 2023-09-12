import { Actividad, AsignaturaCurso, Curso, EstablecimientoSede, TemaContenidoRepositorio, UnidadTema } from '@app/typeorm/entities';
import { Unidad } from '@app/typeorm/entities/unidad.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs' 
@Injectable()
export class ReportesService {

    constructor(
        @InjectRepository(EstablecimientoSede) private establecimientoSedeRepo: Repository<EstablecimientoSede>,
        @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
        @InjectRepository(AsignaturaCurso) private asignaturaCursoRepository: Repository<AsignaturaCurso>,
        private readonly entityManager: EntityManager
    ){}
    async getCursos(range?: string): Promise<any[]>{
        Logger.debug('CURSOS')
        Logger.verbose('Fecha', range)
        if(range){
            Logger.debug('CON RANGO DE FECHA')
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

        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
            .select('es.id', 'id')
            .addSelect('es.nombre', 'Establecimiento')
            .addSelect('COUNT(*)', 'Cursos')
            .leftJoin(Curso, 'c', 'es.id = c.sedeid')
            .groupBy('es.nombre, es.id')
            .orderBy('es.id', 'ASC');
      
            return await queryBuilder.getRawMany();
        }
        
    }

    async getAsignaturas(range?: string): Promise<any[]>{
        Logger.debug('ASIGNATURAS', range)
        if(range){
            Logger.debug('CON RANGO DE FECHA')
            const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
            .select('es.id', 'id')
            .addSelect('es.nombre', 'Establecimiento')
            .addSelect('COUNT(*)', 'Asignaturas')
            .leftJoin(AsignaturaCurso, 'ac', 'es.id = ac.sede_id')
            .where('es.created_at > :fecha', { fecha: range })
            .groupBy('es.nombre, es.id')
            .orderBy('es.id', 'ASC');
      
            return await queryBuilder.getRawMany();
        }

        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
            .select('es.id', 'id')
            .addSelect('es.nombre', 'Establecimiento')
            .addSelect('COUNT(*)', 'Asignaturas')
            .leftJoin(AsignaturaCurso, 'ac', 'es.id = ac.sede_id')
            .groupBy('es.nombre, es.id')
            .orderBy('es.id', 'ASC');

            return await queryBuilder.getRawMany();
        }
       
    }

    async getCursoAsignaturas(range?: string): Promise<any[]>{
        Logger.debug('CURSO ASIGNATURA')
        if (range) {
            Logger.debug('CON RANGO DE FECHA')
            const queryBuilder = await this.cursoRepository.createQueryBuilder('curso')
            .select('curso.sedeid', 'establecimientos')
            .addSelect('COUNT(*)', 'Cursos')
            .where(qb => {
                const subQuery = qb
                .subQuery()
                .select('ac.curso_id')
                .from(AsignaturaCurso, 'ac') // Usar la entidad AsignaturaCurso
                .getQuery();
              return `curso.id IN ${subQuery}`
            })
            .where('curso.created_at > :fecha', { fecha: range })
            .groupBy('curso.sedeid')
            .orderBy('curso.sedeid', 'ASC')
        
            return await queryBuilder.getRawMany()
        }

        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.cursoRepository.createQueryBuilder('curso')
            .select('curso.sedeid', 'establecimientos')
            .addSelect('COUNT(*)', 'Cursos')
            .where(qb => {
                const subQuery = qb
                .subQuery()
                .select('ac.curso_id')
                .from(AsignaturaCurso, 'ac') // Usar la entidad AsignaturaCurso
                .getQuery();
              return `curso.id IN ${subQuery}`
            })
            .groupBy('curso.sedeid')
            .orderBy('curso.sedeid', 'ASC')
      
            return await queryBuilder.getRawMany()
        }
        
    }
    
    async getAsignaturasProgramas(range?: string): Promise<any[]>{
        Logger.debug('ASIGNATURA PROGRAMAS')
        if(range){
            Logger.debug('CON RANGO DE FECHA')
            const queryBuilder = await this.asignaturaCursoRepository.createQueryBuilder('ac')
            .select('ac.sede_id', 'sede_id')
            .addSelect('COUNT(*)', 'Programas')
            .where('ac.programa_id IS NOT NULL')
            .where('ac.created_at > :fecha', { fecha: range })
            .groupBy('ac.sede_id')
            .orderBy('ac.sede_id')

            return await queryBuilder.getRawMany()
        }
        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.asignaturaCursoRepository.createQueryBuilder('ac')
            .select('ac.sede_id', 'sede_id')
            .addSelect('COUNT(*)', 'Programas')
            .where('ac.programa_id IS NOT NULL')
            .groupBy('ac.sede_id')
            .orderBy('ac.sede_id')
      
            return await queryBuilder.getRawMany()
        }
    
    }

    async getAsignaturasContenido(range?: string): Promise<any[]>{
        Logger.debug('ASIGNATURA CONTENIDO')
        if(range){
            Logger.debug('CON RANGO DE FECHA')
            const subQuery = this.entityManager
                .createQueryBuilder()
                .select('u.programa_id')
                .from(Unidad, 'u')
                .leftJoin(UnidadTema, 'ut', 'u.id = ut.unidad_id')
                .leftJoin(TemaContenidoRepositorio, 'tcr', 'ut.temas_id = tcr.tema_id')
                .where('tcr.contenidos_id IS NOT NULL');

            const queryBuilder = this.entityManager
                .createQueryBuilder(AsignaturaCurso, 'ac')
                .select('ac.sede_id', 'sede_id')
                .addSelect('COUNT(*)', 'Contenidos')
                .where(`ac.programa_id IN (${subQuery.getQuery()})`)
                .groupBy('ac.sede_id')
                .orderBy('ac.sede_id', 'ASC');
            
            const resultado = await queryBuilder.getRawMany()
            return resultado
        }
        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const subQuery = this.entityManager
                .createQueryBuilder()
                .select('u.programa_id')
                .from(Unidad, 'u')
                .leftJoin(UnidadTema, 'ut', 'u.id = ut.unidad_id')
                .leftJoin(TemaContenidoRepositorio, 'tcr', 'ut.temas_id = tcr.tema_id')
                .where('tcr.contenidos_id IS NOT NULL');

            const queryBuilder = this.entityManager
                .createQueryBuilder(AsignaturaCurso, 'ac')
                .select('ac.sede_id', 'sede_id')
                .addSelect('COUNT(*)', 'Contenidos')
                .where(`ac.programa_id IN (${subQuery.getQuery()})`)
                .where('ac.created_at > :fecha', { fecha: range })
                .groupBy('ac.sede_id')
                .orderBy('ac.sede_id', 'ASC');
            
            const resultado = await queryBuilder.getRawMany()
            return resultado
        }
    
    }
    async getActividades(range?: string): Promise<any[]>{
        Logger.debug('ACTIVIDADES')
        if(range){
            Logger.debug('CON RANGO DE FECHA')
            const queryBuilder = await this.asignaturaCursoRepository.createQueryBuilder('ac')
            .select('ac.sede_id', 'sede_id')
            .addSelect('COUNT(*)', 'Actividades')
            .innerJoin('Actividad', 'a', 'a.asignaturacurso_id = ac.id')
            .where('ac.created_at > :fecha', { fecha: range })
            .groupBy('ac.sede_id')
            .orderBy('ac.sede_id', 'ASC');
            
            return await queryBuilder.getRawMany()
        }
        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.asignaturaCursoRepository.createQueryBuilder('ac')
            .select('ac.sede_id', 'sede_id')
            .addSelect('COUNT(*)', 'Actividades')
            .innerJoin('Actividad', 'a', 'a.asignaturacurso_id = ac.id')
            .groupBy('ac.sede_id')
            .orderBy('ac.sede_id', 'ASC');
      
            return await queryBuilder.getRawMany()
        }
    
    }

    async getEstablecimientos(range?: string): Promise<any[]>{
        Logger.debug('ESTABLECIMIENTOS')
        if(range){
            Logger.debug('CON RANGO DE FECHA')
            const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
            .select('es.id', 'id')
            .addSelect('es.nombre', 'Establecimiento')
            .where('c.created_at > :fecha', { fecha: range })
            .orderBy('es.id', 'ASC');
        
            return await queryBuilder.getRawMany();
        }

        if(!range){
            Logger.debug('SIN RANGO DE FECHA')
            const queryBuilder = await this.establecimientoSedeRepo.createQueryBuilder('es')
            .select('es.id', 'id')
            .addSelect('es.nombre', 'Establecimiento')
            .orderBy('es.id', 'ASC');
      
            return await queryBuilder.getRawMany();
        }
        
    }

    async estadisticaSedeTotal(date?){
        const resumen = await this.getEstablecimientos()
        const cursos = await this.getCursos(date)
        const asignaturas = await this.getAsignaturas(date)
        const cursosAsignaturas = await this.getCursoAsignaturas(date)
        const asignaturasProgramas = await this.getAsignaturasProgramas(date)
        const asignaturaContenido = await this.getAsignaturasContenido(date)
        const actividades = await this.getActividades(date)
        
        const workbook = new ExcelJS.Workbook()
        const fileName = `Estadistica-sede-totales.xlsx`
        const sheet = workbook.addWorksheet(`Resumen`)
        const reColumns = [
            { header: 'Id', key: 'id'},
            { header: 'Establecimiento', key: 'establecimiento'},
            { header: 'Cant Cursos', key: 'cantCursos'},
            { header: 'Cant Asignaturas', key: 'cantAsignaturas'},
            { header: 'Cursos con al menos 1 asignatura', key: 'cursosUnaAsignatura'},
            { header: 'Asignaturas con Programas Asignados', key: 'asignaturaProgramas'},
            { header: 'Asignaturas con contenido', key: 'asignaturaContenido'},
            { header: 'Cant Actividades', key: 'cantActividades'}
        ]

        sheet.columns = reColumns

        let datos = []
        for (let i = 0; i < resumen.length; i++) {
            datos.push(
                {
                    id: resumen[i].id,
                    establecimiento: resumen[i].Establecimiento,
                    cantCursos: 0,
                    cantAsignaturas: 0,
                    cursosUnaAsignatura: 0,
                    asignaturaProgramas: 0,
                    asignaturaContenido: 0,
                    cantActividades: 0
                }
            )
        }

        //Cursos
        cursos.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.id === datos[i].id){
                    datos[i].cantCursos = parseInt(e.Cursos)
                }
            }
           
        })

        //Asignaturas
        asignaturas.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.id === datos[i].id){
                    datos[i].cantAsignaturas = parseInt(e.Asignaturas)
                }
                
            }
        })


        //Cursos asignaturas
        cursosAsignaturas.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.establecimientos === datos[i].id){
                    datos[i].cursosUnaAsignatura = parseInt(e.Cursos)
                }
            }
        })

        //Asignaturas programas
        asignaturasProgramas.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.sede_id === datos[i].id){
                    datos[i].asignaturaProgramas = parseInt(e.Programas)
                }
            }
        })

        //Asignaturas contenidos
        asignaturaContenido.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.sede_id === datos[i].id){
                    datos[i].asignaturaContenido = parseInt(e.Contenidos)
                }
            }
        })

        //Actividades
        actividades.map(e => {
            for (let i = 0; i < datos.length; i++) {
                if(e.sede_id === datos[i].id){
                    datos[i].cantActividades = parseInt(e.Actividades)
                }
            }
        })
        sheet.addRows(datos)

        await workbook.xlsx.writeFile(fileName)

        Logger.debug('Creado exitosamente')
    }
      
   

}

