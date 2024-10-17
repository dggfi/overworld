import { useState, useCallback } from "react"

export default function useStateWithValidation<T>(validationFunc: Function, initialValue: T) {
  const [state, setState] = useState(initialValue)
  const [isValid, setIsValid] = useState(() => validationFunc(state))

  const onChange = useCallback(
    (nextState: T) => {
      const value = typeof nextState === "function" ? nextState(state) : nextState
      setState(value)
      setIsValid(validationFunc(value))
    },
    [validationFunc]
  )
  return [state, onChange, isValid]
}