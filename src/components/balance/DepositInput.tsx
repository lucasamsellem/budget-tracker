import { Input } from '../ui/input'
import CheckButton from '../buttons/CheckButton'

type DepositInputProps = {
  inputValue: string
  onInputValue: React.Dispatch<React.SetStateAction<string>>
  eventHandler?: (e: React.FormEvent) => void
  withdrawRef?: React.MutableRefObject<null>
}

function DepositInput({ inputValue, onInputValue, eventHandler, withdrawRef }: DepositInputProps) {
  return (
    <form className='flex gap-2'>
      <Input
        name='transaction-amount'
        value={inputValue}
        type='number'
        min={0}
        placeholder='Enter amount'
        ref={withdrawRef}
        onChange={e => onInputValue(e.target.value)}
      />

      <CheckButton type='submit' className='size-8' eventHandler={eventHandler} />
    </form>
  )
}

export default DepositInput
