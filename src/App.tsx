import { useState } from "react"
import { SelectOption } from "./components/select"
import { MultiSelect } from "./components/multiselect"
import { Temporal } from "@js-temporal/polyfill"
import "./main.css"
import { Button } from "./components/button"
import { UserTextBox } from "./components/usertextbox"
import { BookingFrom } from "./components/bookingfrom"
import { CashTextBox } from "./components/cashtextbox"
import { DateTimePicker } from "./components/DateTimePicker"

const options: SelectOption[] = [
  { label: "Please select one...", value: "placeholder" },
  { label: "Room 1", value: "room1" },
  { label: "Room 2", value: "room2" }
]


function App() {
  // const [customvalue, setCustomValue] = useState<SelectOption>(options[0])
  const [values, setValues] = useState<SelectOption[]>([])

  const now = Temporal.Now.plainDateISO()
  return (
    <main>
      <h1>{now.add({days: 1}).toString()}</h1>
      <UserTextBox />
      <br />
      <BookingFrom />
      <br />
      <DateTimePicker />
      <br />
      <CashTextBox />
      <br />
      {/* <Select value={customvalue} options={options} onChange={val => {
          const values = val as SelectOption
          setCustomValue(values)
        }}/>
      <br /> */}
      <MultiSelect multiple={true} options={options} value={values} onChange={val => {
          const values = val as SelectOption[]
          setValues(values)
        }}/>
        <br />
      <Button name={"Confirm to continue"} isMain={true} />
    </main>
  )
}

export default App
