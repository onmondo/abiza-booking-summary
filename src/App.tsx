import { useState } from "react"
import { Select, SelectOption } from "./components/select"
import { MultiSelect } from "./components/multiselect"
import "./main.css"

const options: SelectOption[] = [
  { label: "Please select one...", value: "placeholder" },
  { label: "Room 1", value: "room1" },
  { label: "Room 2", value: "room2" }
]


function App() {
  const [value, setValue] = useState<SelectOption>(options[0])
  const [values, setValues] = useState<SelectOption[]>([])
  console.log(values)
  return (
    <>
      <Select options={options} value={value} onChange={val => {
          const value = val as SelectOption
          setValue(value)
        }}/>
      <br />
      <MultiSelect multiple={true} options={options} value={values} onChange={val => {
          const values = val as SelectOption[]
          setValues(values)
        }}/>
    </>
  )
}

export default App
