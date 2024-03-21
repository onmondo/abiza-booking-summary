import { useEffect, useState } from "react";
import { SolarDollarMinimalisticLinear } from "../icons/cashicon";
import styles from "./textbox.module.css";
import selectStyles from "./select.module.css";
import Big from "big.js";
import { Select, SelectOption } from "../select";
import { PaymentDetails } from "../bookingformModal";
import { useSelector, useDispatch } from "react-redux";
import { setNightlyPrice, setPaymentMode, setTotalPayout } from "../../redux/ducks/bookingForm";

type ChangePayRequest = {
    value: PaymentDetails
    // onChange: <T>(val: T) => void
}

export function CashTextBox({ value }: ChangePayRequest) {
    const modeOfPayment = useSelector<{ bookingForm: { modeOfPayment: string }}>((state) => state.bookingForm.modeOfPayment) as string;
    const nightlyPrice = useSelector<{ bookingForm: { nightlyPrice: number }}>((state) => state.bookingForm.nightlyPrice) as number;
    const totalPayout = useSelector<{ bookingForm: { totalPayout: number }}>((state) => state.bookingForm.totalPayout) as number;
    // const [amount, setAmount] = useState<string>();
    // const [total, setTotal] = useState<string>();
    // const [paymentOption, setPaymentOption] = useState<SelectOption>()
    const [paymentOptions, setPaymentOptions] = useState<SelectOption[]>([]);

    const dispatch = useDispatch();

    const handleAmountChange = (val: { amount: string }) => {
        // setAmount(val.amount)
        // onChange(val)
        dispatch(setNightlyPrice(parseFloat(val.amount)))
    }

    const handleAmountBlur = (val: { amount: string }) => {
        const numberStr = (val.amount) ? val.amount : "0.00"
        const amountEntered = Big(numberStr).toFixed(2);
        // setAmount(amountEntered)
        // onChange(val)

        dispatch(setNightlyPrice(parseFloat(amountEntered)))
    }

    const handlePaymentOnChange = (val: SelectOption | unknown) => {
        const value = val as SelectOption
        // setPaymentOption(value)
        // onChange({ paymentMode: value.value})
        dispatch(setPaymentMode(value.value))
    }

    const handleTotalChange = (val: { totalPayout: string }) => {
        // setTotal(val.totalPayout)
        // onChange(val)
        dispatch(setTotalPayout(parseFloat(val.totalPayout)));
    }

    const handleTotalBlur = (val: { totalPayout: string }) => {
        const numberStr = (val.totalPayout) ? val.totalPayout : "0.00"
        const amountEntered = Big(numberStr).toFixed(2);
        // setTotal(amountEntered)
        // onChange(val)
        dispatch(setTotalPayout(parseFloat(amountEntered)));
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
                // value={
                //     (value?.paymentMode)
                //         ? paymentOptions.find((paymentOption) => paymentOption.value === value.paymentMode)
                //         : paymentOption
                // }
                value={
                    (modeOfPayment)
                        ? paymentOptions.find((paymentOption) => paymentOption.value === modeOfPayment)
                        : paymentOptions.find((paymentOption) => paymentOption.value === value.paymentMode)
                }                
                options={paymentOptions} 
                onChange={(v) => { handlePaymentOnChange(v) }} 
                newStyles={selectStyles}
            />
            <input 
                type="number" 
                value={(nightlyPrice) ? nightlyPrice : value.amount}
                placeholder="Nightly price" 
                onBlur={(e) => { handleAmountBlur({ amount: e.target.value }) }}
                onChange={(e) => { handleAmountChange({ amount: e.target.value }) }}
                // onFocus={() => {
                //     setAmount("")
                // }}
            />
            <input 
                type="number" 
                value={(totalPayout) ? totalPayout : value.totalPayout}
                placeholder="Total payout" 
                onBlur={(e) => { handleTotalBlur({ totalPayout: e.target.value }) }}
                onChange={(e) => { handleTotalChange({ totalPayout: e.target.value }) }}
                // onFocus={() => {
                //     setTotal("")
                // }}
            />
        </section>
    )
}