import './Button.css'
export default function Button(props: any) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
