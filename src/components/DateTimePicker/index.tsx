import { useEffect, useState } from "react";
import { SolarCalendarDateLinear } from "../icons/datetimeicon";
import styles from "./datetime.module.css";
import selectStyles from "./select.module.css";
import { Select, SelectOption } from "../select";
import moment from "moment";
import { ISODateText } from "../bookingformModal";

type ChangeDateRequest = {
    value: ISODateText
    onChange: <T>(val: T) => void
}

export function DateTimePicker({ value, onChange }: ChangeDateRequest) {
    const [month, setMonth] = useState<SelectOption>();
    const [day, setDay] = useState<SelectOption>();
    const [year, setYear] = useState<SelectOption>();
    const [monthOptions, setMonthOptions] = useState<SelectOption[]>([]);
    const [dayOptions, setDayOptions] = useState<SelectOption[]>([]);
    const [yearOptions, setYearOptions] = useState<SelectOption[]>([]);
    // const [isoDate, setISODate] = useState<ISODateText>();

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

    // useEffect(() => {
    //     setISODate({ month: month?.value, day: day?.value, year: year?.value})
    // }, [month, day, year])

    function handleMonthOnChange(val: SelectOption | unknown ) {
        const value = val as SelectOption
        setMonth(value)
        onChange({ month: value.value })
        const currentYear = moment().year();
        const currentSelectedMonthYear = moment(`${currentYear}-${value.value}`).format("YYYY-MM")
        populateDayOptions(currentSelectedMonthYear)
        // const enteredISODate = isoDate as ISODateText;
        // setISODate({...enteredISODate, month: value.value})
    }

    function handleDayOnChange(val: SelectOption | unknown) {
        const value = val as SelectOption
        setDay(value)
        onChange({ day: value.value})
        // const enteredISODate = isoDate as ISODateText;
        // setISODate({...enteredISODate, day: value.value})
        
        // onChange(enteredISODate)
    }

    function handleYearOnChange(val: SelectOption | unknown) {
        const value = val as SelectOption
        setYear(value)
        onChange({  year: value.value })
        // const enteredISODate = isoDate as ISODateText;
        // setISODate({...enteredISODate, year: value.value})
    
        // onChange(enteredISODate)
    }

    return (
        <section className={styles.container}>
            <SolarCalendarDateLinear />
            <Select 
                // value={
                //     (value?.month) 
                //         ? monthOptions.find((month) => {
                //             const selectedMonth = moment(value.month);
                //             return month.value === selectedMonth.format("MMMM")
                //         }) 
                //         : month
                // }
                value={
                    (month) 
                        ? month 
                        : monthOptions.find((month) => {
                            const selectedMonth = moment(value.month);
                            return month.value === selectedMonth.format("MMMM")
                        })
                }                
                options={monthOptions} 
                onChange={(v) => handleMonthOnChange(v) }
                newStyles={selectStyles}
            />
            <Select 
                value={
                    (day) 
                        ? day
                        : dayOptions.find((day) => {
                            const selectedDay = moment(value.day);
                            return day.value === selectedDay.format("D")
                        }) 
                }                
                options={dayOptions} 
                onChange={(v) => handleDayOnChange(v) } 
                newStyles={selectStyles}
            />
            <Select 
                value={
                    (year) 
                        ? year
                        : yearOptions.find((year) => {
                            const selectedYear = moment(value.year);
                            return year.value === selectedYear.format("YYYY")
                        }) 
                } 
                options={yearOptions} 
                onChange={(v) => handleYearOnChange(v)} 
                newStyles={selectStyles}
            />
        </section>
    )
}