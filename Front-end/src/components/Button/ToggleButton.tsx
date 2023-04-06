import React, { useState } from 'react'
import './ToggleButton.css'
export const Toggle = ({ toggled, onClick }) => {
  const [isToggled, setToogled] = React.useState(false)

  React.useEffect(() => {
    if (toggled == 'on') setToogled(true)
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
      />
      <span className="span__" />
    </label>
  )
}
