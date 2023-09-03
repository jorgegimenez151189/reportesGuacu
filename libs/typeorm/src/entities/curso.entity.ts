import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { EstablecimientoSede } from './establecimiento_sede.entity'

@Entity({name:'curso'})
// @Index(['client_id', 'operadora', 'date'], { unique: true })
export class Curso {
  // @PrimaryColumn({ length: 50, unique: true })
  //   id: string
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
  @Column({length: 50})
    division: string
  @Column()
    sistem_id: number
  @Column()  
    updated_at:Date
  @Column()
    updated_by: Date
  @Column()
    version: number
  @Column()
    grado_id: number
  @Column()
    sedeid: number
  @Column()
    orden: number
  @Column()
    year: number
  @Column()
    attendance_id: number
  @JoinColumn({ name: 'sedeid' })
    sede: EstablecimientoSede;

}
