import { useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string
}

type SelectProps = {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | unknown) => void
}

export function Select({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    function clearOptions() {
        onChange(options[0])
    }

    function selectOption(option: SelectOption) {
        if (option !== value) onChange(option)
    }

    function isOptionSelected(option: SelectOption) {
        return option === value;
    }

    return (
        <section 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)} 
            tabIndex={0} 
            className={styles.container}
        >
            <h4 className={styles.value}>{value?.label}</h4>
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