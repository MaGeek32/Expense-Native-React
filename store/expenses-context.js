import { createContext, useReducer } from "react"

// const DUMMY_EXPNESES = [{
//   id: 'e1',
//   description: 'A pair of shoes',
//   amount: 59.99,
//   date: new Date('2022-06-15'),
// },
// {
//   id: 'e2',
//   description: 'A pair of trousers',
//   amount: 23.99,
//   date: new Date('2022-06-14'),
// },
// {
//   id: 'e3',
//   description: 'A pair of babanas',
//   amount: 5.99,
//   date: new Date('2020-04-19')
// },

// {
//   id: 'e4',
//   description: 'A shoes',
//   amount: 39.99,
//   date: new Date('2021-05-19'),
// },
// {
//   id: 'e5',
//   description: 'Kobe',
//   amount: 19.99,
//   date: new Date('2021-07-19'),
// },
// {
//   id: 'e6',
//   description: 'A pair of shoes',
//   amount: 59.99,
//   date: new Date('2021-12-19'),
// },
// {
//   id: 'e7',
//   description: 'A pair of trousers',
//   amount: 23.99,
//   date: new Date('2022-02-19'),
// },
// {
//   id: 'e8',
//   description: 'A pair of babanas',
//   amount: 5.99,
//   date: new Date('2020-04-19')
// },

// {
//   id: 'e9',
//   description: 'A shoes',
//   amount: 39.99,
//   date: new Date('2021-05-19'),
// },
// {
//   id: 'e10',
//   description: 'Kobe',
//   amount: 19.99,
//   date: new Date('2021-07-19'),
// }

// ]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  setExpenses: (expenses) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { },
})

function expensesReducer (state, action) {
  switch (action.type) {
    case 'ADD':

      // const id = new Date().toString() + Math.random().toString()
      return [action.payload, ...state]


    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case 'UPDATE':

      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id)

      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state

  }
}

function ExpensesContextProvider ({ children }) {

  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses (expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense (id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }


  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider