import { useEffect, useState } from "react";
import { SolarCalendarDateLinear } from "../icons/datetimeicon";
import styles from "./datetime.module.css";
import selectStyles from "./select.module.css";
import { Select, SelectOption } from "../select";
import moment from "moment";

type ChangeDateRequest = {
    value: string
    onChange: <T>(val: T) => void
}

export function DateTimePicker({ value, onChange }: ChangeDateRequest) {
    
    const [month, setMonth] = useState<SelectOption>();
    const [day, setDay] = useState<SelectOption>();
    const [year, setYear] = useState<SelectOption>();
    const [monthOptions, setMonthOptions] = useState<SelectOption[]>([]);
    const [dayOptions, setDayOptions] = useState<SelectOption[]>([]);
    const [yearOptions, setYearOptions] = useState<SelectOption[]>([]);

    const populateMonthOptions = () => {
        const monthOptions: SelectOption[] = moment.months().map(month => {return { label: month, value: month }})
        setMonthOptions(monthOptions)
    }

    const populateDayOptions = (currentMonthYear: string) => {
        const numOfDays: number = parseInt(moment(currentMonthYear).daysInMonth().toString());
        const dayOptionCollection: SelectOption[] = [];
        for(let i = 1; i <= numOfDays; i++) {
            dayOptionCollection.push({ label: i.toString(), value: i.toString()})
        }
        setDayOptions(dayOptionCollection);
    }

    const populateYearOptions = (currentYear: string) => {
        const numOfYearsToAdd = 10
        const yearOptionCollection: SelectOption[] = [];
        const targetYear = moment(currentYear).subtract(5, "years").year().toString();
        let year = parseInt(targetYear)
        for(let i = 1; i <= numOfYearsToAdd; i++) {
            year += 1
            yearOptionCollection.push({ label: year.toString(), value: year.toString()})
        }
        setYearOptions(yearOptionCollection)
    }


    useEffect(() => {
        const currentMonthYear = moment().format("YYYY-MM")
        populateMonthOptions()
        populateDayOptions(currentMonthYear)
        populateYearOptions(currentMonthYear)
    }, [])

    useEffect(() => {
        setMonth(monthOptions.find(monthOption => monthOption.value === moment().format("MMMM")))
    }, [monthOptions])

    useEffect(() => {
        setDay(dayOptions.find(dayOption => dayOption.value === moment().format("D")))
    }, [dayOptions])

    useEffect(() => {
        setYear(yearOptions.find(yearOption => yearOption.value === moment().format("YYYY")))
    }, [yearOptions])

    function handleMonthOnChange(val: SelectOption | unknown ) {
        const value = val as SelectOption
        setMonth(value)
        const currentYear = moment().year();
        const currentDay = moment().day();
        onChange(moment(`${currentYear}-${value.value}-${(day) ? day.value : currentDay}`).format("YYYY-MM-DD"))
        const currentSelectedMonthYear = moment(`${currentYear}-${value.value}`).format("YYYY-MM")
        populateDayOptions(currentSelectedMonthYear)
    }

    function handleDayOnChange(val: SelectOption | unknown) {
        const value = val as SelectOption
        setDay(value)
        const currentYear = moment().year();
        const currentMonth = moment().month();
        onChange(moment(`${currentYear}-${(month) ? month.value : currentMonth}-${value.value}`).format("YYYY-MM-DD"))
    }

    function handleYearOnChange(val: SelectOption | unknown) {
        const value = val as SelectOption
        setYear(value)
        const currentMonth = moment().month();
        const currentDay = moment().day();
        onChange(moment(`${value.value}-${(month) ? month.value : currentMonth}-${(day) ? day.value : currentDay}`).format("YYYY-MM-DD"))
    }

    return (
        <section className={styles.container}>
            <SolarCalendarDateLinear />
            <Select 
                value={
                    (value) 
                        ? monthOptions.find((month) => {
                            const selectedMonth = moment(value);
                            return month.value === selectedMonth.format("MMMM")
                        }) 
                        : month
                }
                options={monthOptions} 
                onChange={(v) => handleMonthOnChange(v) }
                newStyles={selectStyles}
            />
            <Select 
                value={
                    (value) 
                        ? dayOptions.find((day) => {
                            const selectedDay = moment(value);
                            return day.value === selectedDay.format("D")
                        }) 
                        : day
                }
                options={dayOptions} 
                onChange={(v) => handleDayOnChange(v) } 
                newStyles={selectStyles}
            />
            <Select 
                value={
                    (value) 
                        ? yearOptions.find((year) => {
                            const selectedYear = moment(value);
                            return year.value === selectedYear.format("YYYY")
                        }) 
                        : year
                }
                options={yearOptions} 
                onChange={(v) => handleYearOnChange(v)} 
                newStyles={selectStyles}
            />
        </section>
    )
}