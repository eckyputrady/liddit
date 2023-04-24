import {Profile} from '../../model'
import './ProfileComponent.css'
import { Form, FormProps, OnFormActionFunction, OnFormFieldChangedFunction } from '../input/Input'

export function View(props: Profile) {
    const bgStyle = {
        backgroundImage: `url("${props.bgUrl}")`
    };
    return (
        <div className='component-profile'>
            <div className='component-profile--bg' style={bgStyle}/>
            <img className='component-profile--profpic' src={props.profPicUrl} />
            {props.title && <h1 className='component-profile--title'>{props.title}</h1>}
            {props.subtitle && <h2 className='component-profile--subtitle'>{props.subtitle}</h2>}
            {props.paragraph && <p className='component-profile--paragraph'>{props.paragraph}</p>}
        </div>
    )
}

interface EditProps extends Profile {
    onFormAction: OnFormActionFunction,
    onFormFieldChanged: OnFormFieldChangedFunction
}

export function EditView(props: EditProps) {
    const formProps: FormProps = {
        id: props.id,
        title: 'Profile',
        onFormAction: props.onFormAction,
        onFormFieldChanged: props.onFormFieldChanged,
        inputs: [
            {
              type: 'file',
              id: 'bgPic',
              label: 'Background Picture',
            },
            {
              type: 'file',
              id: 'profPic',
              label: 'Profile Picture',
            },
            {
              type: 'text',
              id: 'title',
              label: 'Title',
            },
            {
              type: 'text',
              id: 'subtitle',
              label: 'Subtitle',
            },
            {
              type: 'textarea',
              id: 'paragraph',
              label: 'Paragraph',
            }
        ]
    }

    return <Form {...formProps} />
}