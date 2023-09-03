import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Curso } from './curso.entity'
import { AsignaturaCurso } from './asignaturas.entity'

@Entity({name:'establecimiento_sede'})
export class EstablecimientoSede {
  @PrimaryColumn({ length: 50, unique: true })
    id: string
  @Column()
    created_at: Date
  @Column()
    created_by: Date
  @Column()
    deleted_at: Date
  @Column()
    deleted_by: Date
  @Column()
    nombre: string
  @Column()
    sistem_id: number
  @Column()
    updated_at: Date
  @Column()
    updated_by: number
  @Column()
    version: number
  @Column()
    direccion_id: number
  @Column()
    establecimiento_id: number
  @Column()
    repositorio_id: number
  @Column()
    contacto_id: number
  @Column()
    cantidad_alumnos: number
  @Column()
    cantidad_docentes: number
  @Column()
    cantidad_gestores: number
  @Column()
    search_col: string
  @Column()
    cue: number
  @Column()
    numero: number
  @OneToMany(() => Curso, curso => curso.sedeid)
    cursos: Curso[];
  @OneToMany(() => AsignaturaCurso, asgignatura_curso => asgignatura_curso.sede_id)
    asgignatura_curso: AsignaturaCurso[];

}
