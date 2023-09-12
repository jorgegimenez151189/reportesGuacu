import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('reportes')
export class ReportesController {
    constructor(
        private reportService: ReportesService,
    ){}

    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: diskStorage({
                    destination: './uploads',
                    filename: function(req, file, cb){
                        cb(null, file.originalname + '_' + Date.now() + '.pdf')
                    }
                })
            }
        )
    )

    @Post('file')
    async uploadFile(
        @UploadedFile() file : Express.Multer.File
    ){
        Logger.debug('Ingreso')
        try {
            return{
                msg: `Archivo ${file.filename} cargado corretamente`
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
        
    }

    @Get('cursos/:range')
    async crusosRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - CURSOS POR FECHA')
        try {
            const response = await this.reportService.getCursos(range)
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('cursos')
    async cursos(){
        Logger.debug('GET DE REPORTES - CURSOS')
        try {
            const response = await this.reportService.getCursos()
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturas')
    async asignaturas(){
        Logger.debug('GET DE REPORTES - ASIGNATURAS')
        try {
            const response = await this.reportService.getAsignaturas()
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturas/:range')
    async asignaturasRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - ASIGNATURAS')
        try {
            const response = await this.reportService.getAsignaturas(range)
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('cursoAsignatura')
    async cursoAsignatura(){
        Logger.debug('GET DE REPORTES - CURSOS Y ASIGNATURAS')
        try {
            const response = await this.reportService.getCursoAsignaturas()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('cursoAsignatura/:range')
    async cursoAsignaturaRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - CURSOS Y ASIGNATURAS - RANGO')
        try {
            const response = await this.reportService.getCursoAsignaturas(range)
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturaProgramas/')
    async asignaturaProgramas(){
        Logger.debug('GET DE REPORTES - ASIGNATURAS CON PROGRAMAS')
        try {
            const response = await this.reportService.getAsignaturasProgramas()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturaProgramas/:range')
    async asignaturaProgramasRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - ASIGNATURAS CON PROGRAMAS')
        try {
            const response = await this.reportService.getAsignaturasProgramas(range)
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturaContenido')
    async asignaturaContenido(){
        Logger.debug('GET DE REPORTES - ASIGNATURAS CON CONTENIDO')
        try {
            const response = await this.reportService.getAsignaturasContenido()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('asignaturaContenido/:range')
    async asignaturaContenidoRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - ASIGNATURAS CON CONTENIDO')
        try {
            const response = await this.reportService.getAsignaturasContenido(range)
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('actividades')
    async actividades(){
        Logger.debug('GET DE REPORTES - ACTIVIDADES')
        try {
            const response = await this.reportService.getActividades()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('actividades/:range')
    async actividadesRange(
        @Param('range') range: string 
    ){
        Logger.debug('GET DE REPORTES - ACTIVIDADES')
        try {
            const response = await this.reportService.getActividades(range)
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('establecimientos')
    async establecimientos(
        @Param('range') range: string 
    ){
        Logger.debug('GET DE REPORTES - ESTABLECIMIENTOS')
        try {
            const response = await this.reportService.getActividades()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('estadisticasSede')
    async estadisticasSedes(){
        Logger.debug('GET DE REPORTES - ESTADISTICAS')
        try {
            const response = await this.reportService.estadisticaSedeTotal()
            return response
        } catch (error) {
            Logger.error('ERROR', error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
}

