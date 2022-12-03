import React, { useReducer } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'

type Action =
  | { type: 'UPDATE_INPUT'; payload: string }
  | { type: 'VALIDATE_INPUT'; payload: boolean }

type State = {
  value: string
  isValid: boolean
}

function inputReducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        value: action.payload,
      }
    case 'VALIDATE_INPUT':
      return {
        ...state,
        isValid: action.payload,
      }
    default:
      return state
  }
}

const EnquireReputationForm = () => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'UPDATE_INPUT',
      payload: event.target.value,
    })
  }

  function handleBlur() {
    // Validate the input value here. For example, check if it is not empty.
    const isValid = state.value.trim().length > 0
    dispatch({
      type: 'VALIDATE_INPUT',
      payload: isValid,
    })
  }

  return (
    <FormControl isInvalid={!state.isValid}>
      <FormLabel htmlFor="input">Enter your ID:</FormLabel>
      <Input
        id="input"
        type="text"
        value={state.value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormErrorMessage>The input is not valid!</FormErrorMessage>
    </FormControl>
  )
}

export default EnquireReputationForm
