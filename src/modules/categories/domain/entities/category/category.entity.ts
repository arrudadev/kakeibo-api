import { Entity, IEntity } from '@/shared/core/entities/entity'
import { DomainException } from '@/shared/core/exceptions/domain.exception'

interface CategoryProps extends IEntity {
  name: string
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps) {
    super(props)
  }

  protected validate(): void {
    if (!this.props.name.trim()) {
      throw new DomainException('Name is required')
    }
  }

  static create(props: CategoryProps): Category {
    return new Category(props)
  }

  get name() {
    return this.props.name
  }

  changeName(name: string) {
    this.props.name = name
    this.updateTimestamp()
  }
}
