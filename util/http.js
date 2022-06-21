import axios from 'axios'

const BACKEND_URL = 'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10'

export async function storeExpense (expenseData) {
  const response = await axios.post(BACKEND_URL,
    expenseData
  )
  const id = response.data.name
  return id


}

export async function fetchExpenses () {
  
  const response = await axios.get(BACKEND_URL)
  // console.log(response)
  const expenses = []
  // console.log(response.data['data'].race_summaries['0e8130f5-a81d-43ef-9602-c29941a2c744'].meeting_name)
  for (const key in response.data['data'].race_summaries) {
    //  console.log(key)
    //  console.log(response.data['data'].race_summaries[key].meeting_name)
    const raceObj = {
      id: key,
      meetingName: response.data['data'].race_summaries[key].meeting_name,
      raceNumber:  response.data['data'].race_summaries[key].race_name


      // data: response.data[key].race_summaries['01511cf3-a675-4915-a756-6b6d4bd56318'],
      // meeting_name: response.data[key].race_summaries["01511cf3-a675-4915-a756-6b6d4bd56318"].meeting_name,
      // race_number: response.data[key].race_summaries["01511cf3-a675-4915-a756-6b6d4bd56318"].race_number,
      // amount: response.data[key].amount,
      // date: new Date(response.data[key].date),
      // description: response.data[key].description,
    }
    // console.log(raceObj)
    console.log(raceObj.meetingName)
    console.log(raceObj.raceNumber)
    // console.log(key)
    // expenses.push(raceObj)
    }
    
  
  
  return expenses
}

export function updateExpense (id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense (id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}