import { useState } from 'react'
import "./ToggleButton.css"
export const Toggle = ({ toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
        </label>
    )
}