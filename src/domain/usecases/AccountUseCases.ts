import type { Account, AccountRepository } from '../models/Account'

export class AccountUseCases {
  constructor(private repository: AccountRepository) {}

  getAccounts(): Account[] {
    return this.repository.getAccounts()
  }

  addAccount(): void {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      labels: [],
      type: 'LOCAL',
      login: '',
      password: ''
    }
    this.repository.addAccount(newAccount)
  }

  updateAccount(account: Account): void {
    this.repository.updateAccount(account)
  }

  removeAccount(id: string): void {
    this.repository.removeAccount(id)
  }
}
