import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { AsignaturaCurso } from './asignaturas.entity'

@Entity({name:'actividad'})
export class Actividad {
  @PrimaryColumn({ length: 100, unique: true })
    id: string
  @Column()
    admite_fuera_termino: boolean
  @Column()
    created_at: Date
  @Column()
    created_by: Date
  @Column()
    cuerpo: string
  @Column()
    deleted_at: Date
  @Column()
    deleted_by: Date
  @Column({length: 50})
    descripcion: string
  @Column()
    inscribe_alumno: boolean
  @Column()
    max_integrantes: number
  @Column()
    sistem_id: number
  @Column()
    termino: Date
  @Column()
    titulo: string
  @Column()  
    updated_at:Date
  @Column()
    updated_by: Date
  @Column()
    version: number
  @Column()
    visible_desde: Date
  @Column()
    visible_todos: boolean
  @Column()
    asignaturacursolectivo_id: number
  @Column()
    contenidos_id: number
  @Column()
    notificar_docente: number
  @Column()
    asignaturacurso_id: number
  @ManyToOne(() => AsignaturaCurso, asignaturaCurso => asignaturaCurso.actividades)
  @JoinColumn({ name: 'asignaturacurso_id' }) // Esto especifica la columna de unión
    asignaturaCurso: AsignaturaCurso;
}
