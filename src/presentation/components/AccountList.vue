<script setup lang="ts">
import { AccountUseCases } from '@/domain/usecases/AccountUseCases'
import { useAccountStore } from '@/data/repositories/AccountRepositoryImpl'
import AccountForm from './AccountForm.vue'

const accountStore = useAccountStore()
const accountUseCases = new AccountUseCases(accountStore.repository)
</script>

<template>
  <div class="account-list">
    <div class="account-list-header">
      <h1>Управление учетными записями</h1>
      <Button
        icon="pi pi-plus"
        @click="accountUseCases.addAccount()"
      />
    </div>

    <div class="account-list-content">

      <div v-if="accountUseCases.getAccounts().length === 0" class="empty-state">
        Нет учетных записей. Нажмите + чтобы добавить новую.
      </div>

      <AccountForm
        v-for="account in accountUseCases.getAccounts()"
        :key="account.id"
        :account="account"
        :onUpdate="accountUseCases.updateAccount.bind(accountUseCases)"
        :onRemove="accountUseCases.removeAccount.bind(accountUseCases)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  }

  &-content {
    background: var(--surface-card);
    border-radius: 6px;
    box-shadow: var(--card-shadow);

    .help-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: var(--surface-hover);
      border-radius: 6px 6px 0 0;
      color: var(--text-color-secondary);
    }

    .empty-state {
      padding: 2rem;
      text-align: center;
      color: var(--text-color-secondary);
    }
  }
}
</style>
