import { useEffect, useState } from "react";
import { SolarDollarMinimalisticLinear } from "../icons/cashicon";
import styles from "./textbox.module.css";
import selectStyles from "./select.module.css";
import Big from "big.js";
import { Select, SelectOption } from "../select";

type ChangePayRequest = {
    onChange: <T>(val: T) => void
}

export function CashTextBox({ onChange }: ChangePayRequest) {
    const [amount, setAmount] = useState<string>();
    const [total, setTotal] = useState<string>();
    const [paymentOption, setPaymentOption] = useState<SelectOption>()
    const [paymentOptions, setPaymentOptions] = useState<SelectOption[]>([]);

    const handleAmountChange = (val: { amount: string }) => {
        setAmount(val.amount)
        onChange(val)
    }

    const handleAmountBlur = (val: { amount: string }) => {
        const numberStr = (val.amount) ? val.amount : "0.00"
        const amountEntered = Big(numberStr).toFixed(2);
        setAmount(amountEntered)
        onChange(val)
    }

    const handlePaymentOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        setPaymentOption(value)
        onChange({ paymentMode: value.value})
    }

    const handleTotalChange = (val: { totalPayout: string }) => {
        setTotal(val.totalPayout)
        onChange(val)
    }

    const handleTotalBlur = (val: { totalPayout: string }) => {
        const numberStr = (val.totalPayout) ? val.totalPayout : "0.00"
        const amountEntered = Big(numberStr).toFixed(2);
        setTotal(amountEntered)
        onChange(val)
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
                onChange={(v) => { handlePaymentOnChange(v) }} 
                newStyles={selectStyles}
            />
            <input 
                type="number" 
                value={amount}
                placeholder="Nightly price" 
                onBlur={(e) => { handleAmountBlur({ amount: e.target.value }) }}
                onChange={(e) => { handleAmountChange({ amount: e.target.value }) }}
                onFocus={() => {
                    setAmount("")
                }}
            />
            <input 
                type="number" 
                value={total}
                placeholder="Total payout" 
                onBlur={(e) => { handleTotalBlur({ totalPayout: e.target.value }) }}
                onChange={(e) => { handleTotalChange({ totalPayout: e.target.value }) }}
                onFocus={() => {
                    setTotal("")
                }}
            />
        </section>
    )
}