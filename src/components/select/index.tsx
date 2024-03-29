import { useState } from "react"
import inheritStyles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string
}

type SelectProps = {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | unknown) => void
    newStyles?: CSSModuleClasses
}

export function Select({ value, onChange, options, newStyles }: SelectProps) {
    // const customStyles = newStyles as CSSModuleClasses;
    const styles = (newStyles) ? newStyles : inheritStyles;
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    // function clearOptions() {
    //     onChange(options[0])
    // }

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
            <button onClick={(e) => { e.preventDefault(); onChange(options[0]);}} className={styles["clear-btn"]}>&times;</button>
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