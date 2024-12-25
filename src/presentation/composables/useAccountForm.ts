import { ref, watch, type Ref } from 'vue'
import type { Account } from '@/domain/models/Account'

export function useAccountForm(
  account: Account,
  onUpdate: (account: Account) => void,
  onRemove: (id: string) => void
) {
  const login = ref(account.login)
  const password = ref(account.password || '')
  const type = ref(account.type)
  const labels = ref(account.labels.map(label => label.text).join(';'))

  const loginError = ref(false)
  const passwordError = ref(false)

  const validateForm = () => {
    loginError.value = !login.value || login.value.length > 100
    if (type.value === 'LOCAL') {
      passwordError.value = !password.value || password.value.length > 100
    }
    return !loginError.value && (type.value === 'LDAP' || !passwordError.value)
  }

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedAccount: Account = {
        ...account,
        login: login.value,
        password: type.value === 'LDAP' ? null : password.value,
        type: type.value,
        labels: labels.value
          .split(';')
          .filter(label => label.trim())
          .map(label => ({ text: label.trim() }))
      }
      onUpdate(updatedAccount)
    }
  }

  const handleRemove = () => {
    onRemove(account.id)
  }

  const handleLabelInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const value = input.value
    
    if (value.includes(' ')) {
      labels.value = value.replace(/\s+/g, ';')
    }
  }

  watch([login, password, type], handleUpdate)

  return {
    login,
    password,
    type,
    labels,
    loginError,
    passwordError,
    handleUpdate,
    handleRemove,
    handleLabelInput
  }
}
