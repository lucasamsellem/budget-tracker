function colorizeAccountAmount(accountAmount: number) {
  return (
    <span className={`font-bold ${accountAmount > 0 ? 'text-green' : 'text-red'}`}>
      {accountAmount}€
    </span>
  )
}

export default colorizeAccountAmount
