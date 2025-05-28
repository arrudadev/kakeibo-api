import { Entity, IEntity } from '@/shared/core/entities/entity'
import { DomainException } from '@/shared/core/exceptions/domain.exception'

import { categoryErrors } from '../../errors/category.errors'

interface CategoryProps extends IEntity {
  name: string
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps) {
    super(props)
  }

  static create(props: CategoryProps): Category {
    return new Category(props)
  }

  protected validate(): void {
    if (!this.props.name.trim()) {
      throw new DomainException(categoryErrors.name.message)
    }
  }

  get name() {
    return this.props.name
  }

  changeName(name: string) {
    if (!name.trim()) {
      throw new DomainException(categoryErrors.name.message)
    }

    if (name !== this.props.name) {
      this.props.name = name
      this.updateTimestamp()
    }
  }
}
