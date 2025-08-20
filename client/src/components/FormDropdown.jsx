import React from 'react'

export default function FormDropdown({ optionList, label, formdata, setFormdata }) {
    return (
        <div className="input-grp">
            <label htmlFor={label}>{label}</label>
            <select name={label} id={label} value={formdata.particulars} onChange={(e) => (setFormdata({ ...old, particulars: e.target.value })}>
                {
                    optionList.map((option, index) => (
                        <option value={option} key={index}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}
