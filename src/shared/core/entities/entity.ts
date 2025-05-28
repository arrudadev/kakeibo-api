import { randomUUID } from 'node:crypto'

export interface IEntity {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export abstract class Entity<Props> {
  public readonly id: string
  public readonly createdAt: Date
  protected _updatedAt: Date
  protected props: Props
  protected errors: Record<string, { message: string }> = {}

  protected constructor(
    props: Props & { id?: string; createdAt?: Date; updatedAt?: Date },
  ) {
    this.id = props.id ?? randomUUID()
    this.createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt ?? new Date()
    this.props = props
    this.validate()
  }

  protected abstract validate(): void

  protected updateTimestamp() {
    this._updatedAt = new Date()
  }

  get updatedAt() {
    return this._updatedAt
  }
}
