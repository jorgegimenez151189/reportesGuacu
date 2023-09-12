import { Entity, Column, Index, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { AsignaturaCurso } from './asignaturas.entity'

@Entity({name:'tema_contenido_repositorio'})
export class TemaContenidoRepositorio {
  @PrimaryColumn({ length: 100, unique: true })
    tema_id: string
  @Column()
    contenidos_id: number
  @Column()
    index: number
}
