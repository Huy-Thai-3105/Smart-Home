import React from 'react'

export default function Input_nomal(props: any) {
  return (
    <div>
      <label htmlFor="input" className="mb-2 block font-medium text-gray-900 ">
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        id="input"
        className="block w-full rounded-lg border  border-gray-300 p-2.5 text-gray-900 focus:border-blue-500  focus:ring-blue-500  dark:text-black dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  )
}
