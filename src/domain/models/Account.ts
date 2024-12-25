export interface AccountLabel {
  text: string
}

export interface Account {
  id: string
  labels: AccountLabel[]
  type: 'LDAP' | 'LOCAL'
  login: string
  password: string | null
}

export interface AccountRepository {
  getAccounts(): Account[]
  addAccount(account: Account): void
  updateAccount(account: Account): void
  removeAccount(id: string): void
}
