import { useEffect, useState } from "react";
import { SolarCalendarDateLinear } from "../datetimeicon";
import styles from "./datetime.module.css";
import selectStyles from "./select.module.css";
import { Select, SelectOption } from "../select";
import moment from "moment";


export function DateTimePicker() {

    const monthOptions: SelectOption[] = moment.months().map(month => {return { label: month, value: month }})

    const [month, setMonth] = useState<SelectOption>(monthOptions[moment().month()]);
    const [day, setDay] = useState<SelectOption>();
    const [year, setYear] = useState<SelectOption>();
    const [dayOptions, setDayOptions] = useState<SelectOption[]>([]);
    const [yearOptions, setYearOptions] = useState<SelectOption[]>([]);

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
            console.log("year", year, i)
            yearOptionCollection.push({ label: year.toString(), value: year.toString()})
        }
        setYearOptions(yearOptionCollection)
    }


    useEffect(() => {
        const currentMonthYear = moment().format("YYYY-MM")
        populateDayOptions(currentMonthYear)
        populateYearOptions(currentMonthYear)
        // const day = dayOptions.find(dayOption => dayOption.value === moment(currentMonthYear).day().toString())
        console.log("day", dayOptions)
        // setDay()
    }, [])

    const handleMonthOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        setMonth(value)
        const currentYear = moment().year();
        const currentSelectedMonthYear = moment(`${currentYear}-${value.value}`).format("YYYY-MM")
        populateDayOptions(currentSelectedMonthYear)
        
    }

    const handleDayOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        setDay(value)
    }

    const handleYearOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        setYear(value)
    }

    console.log(month, day, year)
    return (
        <section className={styles.container}>
            <SolarCalendarDateLinear />
            <Select 
                value={month} 
                options={monthOptions} 
                onChange={handleMonthOnChange} 
                newStyles={selectStyles}
            />
            <Select 
                value={
                        (day) 
                        ? day 
                        : dayOptions.find(dayOption => dayOption.value === moment().format("D"))
                    } 
                options={dayOptions} 
                onChange={handleDayOnChange} 
                newStyles={selectStyles}
            />
            <Select 
                value={
                    (year) 
                        ? year 
                        : yearOptions.find(yearOption => yearOption.value === moment().format("YYYY"))
                    }
                options={yearOptions} 
                onChange={handleYearOnChange} 
                newStyles={selectStyles}
            />
        </section>
    )
}