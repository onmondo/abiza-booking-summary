import { SolarUserCircleLinear } from "../icons/usericon";
import styles from "./textbox.module.css";

type ChangeTextRequest = {
    onChange: <T>(val: T) => void
}

export function UserTextBox({ 
    onChange 
}: ChangeTextRequest) {
    const handleChangeGuestName = (val: string) => {
        onChange({ guestName: val})
    }

    const handleChangePax = (val: string) => {
        onChange({ pax: val})
    }
    
    const handleChangeStay = (val: string) => {
        onChange({ stay: val })
    }

    return (
        <section className={styles.container}>
            <SolarUserCircleLinear />
            <input className={styles.guest}
                type="text" 
                maxLength={50} 
                placeholder="Guest's name"
                onChange={(e) => { handleChangeGuestName(e.target.value) }}
            />
            <input 
                className={styles.pax}
                type="number" 
                // maxLength={50} 
                placeholder="Pax"
                onChange={(e) => { handleChangePax(e.target.value) }}
            />
            <input 
                className={styles.stay}
                type="number" 
                // value={`${stay} night`}
                // maxLength={50} 
                placeholder="No. stay"
                onChange={(e) => { handleChangeStay(e.target.value) }}
            />
        </section>
    )
}