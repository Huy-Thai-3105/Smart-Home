import React, { useState } from 'react'
import './ToggleButton.css'
export const Toggle = ({ toggled, onClick }) => {
  const [isToggled, setToogled] = React.useState(false)
  React.useEffect(() => {
    if (toggled == 'on' || toggled == 'auto') setToogled(true)
    else {
      setToogled(false)
    }
  }, [toggled])

  const callback = () => {
    setToogled(!isToggled)
    onClick(!isToggled)
  }

  return (
    <label className="label__">
      <input
        className="input__"
        type="checkbox"
        checked={isToggled}
        onClick={callback}
        onChange={() => {}}
      />
      <span className="span__" />
    </label>
  )
}
