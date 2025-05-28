import { IRepository } from 'src/shared/core/repositories/repository'

import { Category } from '../entities/category/category.entity'

export interface ICategoryRepository extends IRepository<Category> {}
