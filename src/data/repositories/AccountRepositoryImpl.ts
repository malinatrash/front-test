import { Account, AccountRepository } from '@/domain/models/Account'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

  const repository: AccountRepository = {
    getAccounts: () => accounts.value,
    
    addAccount: (account: Account) => {
      accounts.value.push(account)
    },

    updateAccount: (updatedAccount: Account) => {
      const index = accounts.value.findIndex(account => account.id === updatedAccount.id)
      if (index !== -1) {
        accounts.value[index] = updatedAccount
      }
    },

    removeAccount: (id: string) => {
      accounts.value = accounts.value.filter(account => account.id !== id)
    }
  }

  return {
    accounts,
    repository
  }
}, {
  persist: true
})
