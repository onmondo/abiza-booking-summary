import { useState } from "react"
import styles from "./select.module.css"
import { SolarBedBroken } from "../bedicon"

export type SelectOption = {
    label: string
    value: string
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | unknown) => void
}

type MultiSelectProps = {
    multiple: true
    value?: SelectOption[]
    onChange: (value: SelectOption | unknown) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultiSelectProps)

export function MultiSelect({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    function clearOptions() {
        multiple ? onChange([]) : onChange(options[0])
    }

    function clearOption(option: SelectOption) {
        const values = value as SelectOption[]
        if (values?.includes(option)) {
            onChange(values.filter(o => o !== option))
        }
        
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value?.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                const values = value as SelectOption[]
                onChange([...values, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
        
    }

    function isOptionSelected(option: SelectOption) {
        const values = value as SelectOption[]
        return multiple ? values.includes(option) : option === value;
    }

    return (
        <section 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)} 
            tabIndex={0} 
            className={styles.container}
        >
            <SolarBedBroken />
            <h6 className={styles.value}>
                {
                    multiple 
                    ? (
                        function() {
                            const values = value as SelectOption[];
                            return values.map((v, index) => (
                                <>
                                    <button 
                                        key={index} 
                                        onClick={
                                            e => {
                                                e.stopPropagation()
                                                clearOption(v)
                                            }
                                        }
                                        className={styles["option-badge"]}
                                    >                                        
                                        <small className={styles["remove-btn"]}>
                                            {v.label}
                                            &nbsp;
                                            &times;
                                        </small>
                                    </button>
                                </>

                            ))                            
                        }
                    )()
                    :
                        value?.label
                }
            </h6>
            <button onClick={clearOptions} className={styles["clear-btn"]}>&times;</button>
            <small className={styles.divider}></small>
            <small className={styles.caret}></small>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li
                        key={index} 
                        className={
                            `${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ""}
                            ${index === highlightedIndex ? styles.highlighted : ""}`}
                        onClick={() => selectOption(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                    >
                        {option.label}
                    </li>
                ))}

            </ul>
        </section>
    )
}