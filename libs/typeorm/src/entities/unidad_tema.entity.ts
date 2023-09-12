import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { AsignaturaCurso } from './asignaturas.entity'

@Entity({name:'unidad_tema'})
export class UnidadTema {
  @PrimaryColumn({ length: 100, unique: true })
    unidad_id: string
  @Column()
    temas_id: number
  @Column()
    index: number
}
