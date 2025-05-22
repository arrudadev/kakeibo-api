import { randomUUID } from 'node:crypto'

export interface IEntity {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export abstract class Entity<Props> {
  protected readonly _id: string
  protected readonly _createdAt: Date
  protected _updatedAt: Date
  protected props: Props

  protected constructor(
    props: Props & { id?: string; createdAt?: Date; updatedAt?: Date },
  ) {
    this._id = props.id ?? randomUUID()
    this._createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt ?? new Date()
    this.props = props
    this.validate()
  }

  protected abstract validate(): void

  protected updateTimestamp() {
    this._updatedAt = new Date()
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }
}
