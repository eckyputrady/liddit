import './Input.css'

export type ActionType = 'save' | 'delete' | 'cancel' | 'moveUp' | 'moveDown';

export type OnFormActionFunction = (formId: string, action: ActionType) => void

export type OnFormFieldChangedFunction = (formId: string, field: string, value: string) => void

export interface Field {
  type: 'file' | 'text' | 'textarea'
  id: string,
  label: string,
  value?: string
}

export interface FormProps {
  id: string;
  title: string;
  inputs: FieldProps[];
  onFormAction?: OnFormActionFunction
  onFormFieldChanged?: OnFormFieldChangedFunction
}

export function Form({id, title, inputs, onFormAction, onFormFieldChanged}: FormProps) {
  const inputViews = inputs.map(i => {
      return <Field key={i.id} {...i} onValueChanged={(field, value) => { onFormFieldChanged && onFormFieldChanged(id, field, value) }} />;

  });
  return (
    <form className='component-input'>
      <h1>{title}</h1>
      {inputViews}
      <button 
        style={{backgroundColor: 'lightgreen', width:'100%'}} 
        onClick={(e) => { e.preventDefault(); onFormAction && onFormAction(id, 'save'); }}>
        Save
      </button>
      <fieldset className='component-input--button-list'>
        <button 
          style={{backgroundColor: 'lightcoral'}} 
          onClick={(e) => { e.preventDefault(); onFormAction && onFormAction(id, 'delete'); }}
          >
          Delete
        </button>
        <button onClick={(e) => { e.preventDefault(); onFormAction && onFormAction(id, 'cancel'); }}>Cancel</button>
        <button onClick={(e) => { e.preventDefault(); onFormAction && onFormAction(id, 'moveUp'); }}>Move Up</button>
        <button onClick={(e) => { e.preventDefault(); onFormAction && onFormAction(id, 'moveDown'); }}>Move Down</button>
      </fieldset>
    </form>
  )
}

export interface FieldProps extends Field {
  onValueChanged?: (id: string, value: string) => void
}

function Field({type, id, label, value, onValueChanged}: FieldProps) {
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      {type == 'text' && <input type="text" value={value} onChange={(e) => onValueChanged && onValueChanged(id, e.target.value)}/>}
      {type == 'textarea' && <textarea value={value} onChange={(e) => onValueChanged && onValueChanged(id, e.target.value)}/>}
    </fieldset>
  )
}