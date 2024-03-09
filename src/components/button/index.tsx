import styles from "./button.module.css";

type ButtonProps = {
    name: string,
    isMain: boolean,
    onClick: () => void
}

export function Button({ name, isMain, onClick }: ButtonProps) {
    return (
        <button 
            className={`${styles.container} ${(isMain) ? styles.main : "" }`}
            onClick={onClick}
        >
            {name}
        </button>
    )
}