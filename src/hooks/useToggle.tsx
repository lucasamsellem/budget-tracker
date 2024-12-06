import { useState } from 'react'

function useToggle(): [boolean, () => void] {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(prev => !prev)
  return [isActive, toggle]
}

export default useToggle
