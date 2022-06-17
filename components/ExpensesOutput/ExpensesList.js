import { FlatList, Text } from "react-native"
import ExpensesItem from "./ExpensesItem"

function renderExpneseItem (itemData) {
  return <ExpensesItem {...itemData.item} />
}

function ExpensesList ({ expenses }) {
  return <FlatList
    data={expenses}
    renderItem={renderExpneseItem}
    keyExtractor={(item) => item.id} />
}
export default ExpensesList