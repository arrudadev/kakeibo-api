import { DomainException } from '@/shared/core/exceptions/domain.exception'

import { Category } from './category.entity'

describe('Category Entity', () => {
  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: false })
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should create a new category', () => {
    const category = Category.create({ name: 'Category 1' })

    expect(category.id).toBeDefined()
    expect(category.name).toBe('Category 1')
    expect(category.createdAt).toBeInstanceOf(Date)
    expect(category.updatedAt).toBeInstanceOf(Date)
  })

  it('should create a category with a custom props', () => {
    const date = new Date(2020, 0, 1, 0, 0, 0)
    const category = Category.create({
      name: 'Category 1',
      id: '123',
      createdAt: date,
      updatedAt: date,
    })

    expect(category.id).toBe('123')
    expect(category.name).toBe('Category 1')
    expect(category.createdAt).toEqual(date)
    expect(category.updatedAt).toEqual(date)
  })

  it('should change the name of the category', () => {
    const category = Category.create({ name: 'Category 1' })

    category.changeName('Category 2')

    expect(category.name).toBe('Category 2')
  })

  it('should not be able to change the name to an empty string', () => {
    const category = Category.create({ name: 'Category 1' })

    expect(() => category.changeName('')).toThrow(DomainException)
  })

  it('should not be able to change the name to the same value', () => {
    const initialTime = new Date(2020, 0, 1, 0, 0, 0)
    jest.setSystemTime(initialTime)

    const category = Category.create({ name: 'Category 1' })

    jest.advanceTimersByTime(5_000)

    category.changeName('Category 1')

    expect(category.updatedAt).toEqual(initialTime)
    expect(category.name).toBe('Category 1')
  })

  it('should update the updatedAt timestamp when the name is changed', () => {
    const initialTime = new Date(2020, 0, 1, 0, 0, 0)
    jest.setSystemTime(initialTime)

    const category = Category.create({
      name: 'Category 1',
      createdAt: initialTime,
      updatedAt: initialTime,
    })

    expect(category.createdAt).toEqual(initialTime)
    expect(category.updatedAt).toEqual(initialTime)

    const advanceMs = 5_000
    jest.advanceTimersByTime(advanceMs)
    category.changeName('Category 2')

    expect(category.updatedAt).toEqual(
      new Date(initialTime.getTime() + advanceMs),
    )
  })

  it('should throw a DomainException if name is empty', () => {
    expect(() => Category.create({ name: '' })).toThrow(DomainException)
  })
})
