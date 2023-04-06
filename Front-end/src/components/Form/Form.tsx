import './Form.css'

const Form = (props: {
  displayModal: boolean
  setDisplayModal: any
  children: any
}) => {
  return (
    <form
      className={`modal ${props.displayModal ? 'modal_show' : 'modal_hide'}`}
      onClick={() => props.setDisplayModal(false)}
    >
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </form>
  )
}

export default Form
