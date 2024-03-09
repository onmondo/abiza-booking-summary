import { useEffect, useState } from "react";
import { SolarDollarMinimalisticLinear } from "../icons/cashicon";
import styles from "./textbox.module.css";
import selectStyles from "./select.module.css";
import Big from "big.js";
import { Select, SelectOption } from "../select";

export function CashTextBox() {
    const [amount, setAmount] = useState("0.00");
    const [paymentOption, setPaymentOption] = useState<SelectOption>()
    const [paymentOptions, setPaymentOptions] = useState<SelectOption[]>([]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numberStr = (event.target.value) ? event.target.value : "0";
        setAmount(numberStr)
    }

    const handleAmountBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const numberStr = (event.target.value) ? event.target.value : "0.00"
        const amountEntered = Big(numberStr).toFixed(2);
        setAmount(amountEntered)
    }

    const handlePaymentOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        setPaymentOption(value)
    }

    const populatePaymentOptions = () => {        
        const paymentOptionCollection: SelectOption[] = [];
        paymentOptionCollection.push({ label: "Cash", value: "Cash" })
        paymentOptionCollection.push({ label: "BPI", value: "BPI" })
        paymentOptionCollection.push({ label: "GCash", value: "GCash" })

        setPaymentOptions(paymentOptionCollection)
    }

    useEffect(() => {
        populatePaymentOptions()
    }, [])

    return (
        <section className={styles.container}>
            <SolarDollarMinimalisticLinear />
            <Select 
                value={paymentOption}
                options={paymentOptions} 
                onChange={handlePaymentOnChange} 
                newStyles={selectStyles}
            />
            <input 
                type="number" 
                value={amount}
                placeholder="0.00" 
                onBlur={handleAmountBlur}
                onChange={handleAmountChange}
                onFocus={() => {
                    setAmount("")
                }}
            />
        </section>
    )
}