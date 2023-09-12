import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { EstablecimientoSede } from './establecimiento_sede.entity'
import { Curso } from './curso.entity'
import { Actividad } from './actividad.entity'

@Entity({name:'asignatura_curso'})
export class AsignaturaCurso {
  @PrimaryColumn({ length: 100, unique: true })
    id: string
  @Column()
    alumnoscant: number
  @Column()
    created_at: Date
  @Column()
    created_by: Date
  @Column()
    deleted_at: Date
  @Column()
    deleted_by: Date
  @Column({length: 50})
    desde: string
  @Column()
    hasta: string
  @Column()
    nombre: string
  @Column()  
    updated_at:Date
  @Column()
    updated_by: Date
  @Column()
    version: number
  @Column()
    asignatura_id: number
  @Column()
    attendance_id: number
  @Column()
    curso_id: number
  @Column()
    msggroup_id: number
  @Column()
    sede_id: number
  @Column()
    programa_id: number
  @JoinColumn({ name: 'sedeid' })
    sede: EstablecimientoSede;
  @JoinColumn({ name: 'curso_id' })
    curso: Curso;
  @OneToMany(() => Actividad, actividad =>  actividad.asignaturacurso_id)
  @JoinColumn({ name: 'asignaturacurso_id' }) // Esto especifica la columna de unión
    actividades: Actividad[];

}
