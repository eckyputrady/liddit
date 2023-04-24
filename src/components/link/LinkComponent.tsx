import {Link} from '../../model'
import { Form, FormProps, OnFormActionFunction, OnFormFieldChangedFunction } from '../input/Input';
import './LinkComponent.css'

export function View(props: Link) {
    return (
        <a href={props.url} target='_blank' className='component-link'>
            <div className='component-link--icon'>
                <i className={`bx bxl-${props.logo}`} />
            </div>
            <div className='component-link--text'>{props.text}</div>
            <div className='component-link--icon' style={{visibility:'hidden'}}>
                <i className={`bx bxl-${props.logo}`} />
            </div>
        </a>
    )
}

interface EditProps extends Link {
    onFormAction: OnFormActionFunction,
    onFormFieldChanged: OnFormFieldChangedFunction
}

export function EditView(props: EditProps) {
    const formProps: FormProps = {
        id: props.id,
        title: 'Link',
        inputs: [
            {
              type: 'text',
              id: 'text',
              label: 'Text',
            },
            {
              type: 'text',
              id: 'url',
              label: 'URL',
            }
        ],
        onFormAction: props.onFormAction,
        onFormFieldChanged: props.onFormFieldChanged
    };
    return <Form {...formProps} />
}