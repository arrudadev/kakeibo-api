import { Module } from '@nestjs/common'

import { CategoriesModule } from '@/modules/categories/categories.module'
import { MerchantsModule } from '@/modules/merchants/merchants.module'
import { TransactionsModule } from '@/modules/transactions/transactions.module'
import { UsersModule } from '@/modules/users/users.module'

@Module({
  imports: [UsersModule, TransactionsModule, MerchantsModule, CategoriesModule],
})
export class AppModule {}
