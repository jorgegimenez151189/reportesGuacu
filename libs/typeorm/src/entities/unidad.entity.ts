import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { EstablecimientoSede } from './establecimiento_sede.entity'
import { Curso } from './curso.entity'

@Entity({name:'unidad'})
export class Unidad {
  @PrimaryColumn({ length: 100, unique: true })
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
    updated_at:Date
  @Column()
    updated_by: Date
  @Column()
    version: number
  @Column()
    programa_id: number
  @Column()
    visible: boolean
}
