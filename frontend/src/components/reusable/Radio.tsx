import { type FC } from "react";

interface RadioProps {
    id: string;
    label: string;
    name: string;
    value: string;
    checked: boolean;
    secondLabel?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}  

const Radio: FC<RadioProps> = ({ id, label, secondLabel, name, value, className, checked, onChange }) => {
    return (
        <label className='radio-container' key={id}>
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange}/>
            <span className={`checkmark ${className}`}>
                <p>{label}</p>
                <p>{secondLabel}</p>
            </span>
        </label>
    );
};

export default Radio;
