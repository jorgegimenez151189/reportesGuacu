import { Controller, Get, HttpException, HttpStatus, Logger, Param } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
    constructor(
        private reportService: ReportesService,
    ){}
    @Get('cursos/:range')
    async crusosRange(
        @Param('range') range: string,
    ){
        Logger.debug('GET DE REPORTES - CURSOS POR FECHA')
        try {
            const response = await this.reportService.getCursosRange(range)
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
            const response = await this.reportService.getAsignaturasRange(range)
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }
}

