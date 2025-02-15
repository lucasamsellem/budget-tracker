// Transactions
export type Transactions = number[]
export type AddTransaction = (amount: number) => void
export type Accounts = {
  balance: number[]
  savings: number[]
}

// Budget
export type BudgetAmountLeft = number
export type IsChecked = boolean
export type OnIsChecked = (value: boolean | ((prevValue: boolean) => boolean)) => void

// Budget slider bar
export type SliderDefaultValue = number
export type SliderValue = number
export type OnSliderValue = React.Dispatch<React.SetStateAction<number>>
