import styles from "./button.module.css";

type ButtonProps = {
    name: string,
    isMain: boolean
}

export function Button({ name, isMain }: ButtonProps) {
    return (
        <button className={`${styles.container} ${(isMain) ? styles.main : "" }`}>
            {name}
        </button>
    )
}