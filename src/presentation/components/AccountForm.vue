<script setup lang="ts">
import { useAccountForm } from '@/presentation/composables/useAccountForm'
import type { Account } from '@/domain/models/Account'

const props = defineProps<{
  account: Account
  onUpdate: (account: Account) => void
  onRemove: (id: string) => void
}>()

const {
  login,
  password,
  type,
  labels,
  loginError,
  passwordError,
  handleUpdate,
  handleRemove,
  handleLabelInput
} = useAccountForm(props.account, props.onUpdate, props.onRemove)
</script>

<template>
  <div class="account-form">
    <div class="form-group">
      <label>Метка</label>
      <InputText
        v-model="labels"
        maxlength="50"
        placeholder="Введите метки через ;"
        @input="handleLabelInput"
        @blur="handleUpdate"
      />
    </div>

    <div class="form-group">
      <label>Тип записи</label>
      <Dropdown
        v-model="type"
        :options="['LDAP', 'LOCAL']"
        placeholder="Выберите тип"
        class="w-full"
      />
    </div>

    <div class="form-group">
      <label>Логин *</label>
      <InputText
        v-model="login"
        :class="{ 'p-invalid': loginError }"
        maxlength="100"
        @blur="handleUpdate"
      />
      <small v-if="loginError" class="p-error">Обязательное поле, максимум 100 символов</small>
    </div>

    <div v-if="type === 'LOCAL'" class="form-group">
      <label>Пароль *</label>
      <Password
        v-model="password"
        :class="{ 'p-invalid': passwordError }"
        maxlength="100"
        toggleMask
        @blur="handleUpdate"
      />
      <small v-if="passwordError" class="p-error">Обязательное поле, максимум 100 символов</small>
    </div>

    <Button
      icon="pi pi-trash"
      severity="danger"
      @click="handleRemove"
    />
  </div>
</template>

<style scoped lang="scss">
.account-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 1rem;
  align-items: start;
  padding: 1rem;
  border-bottom: 1px solid var(--surface-border);

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
  }

  :deep(.p-password) {
    width: 100%;
  }
}
</style>
