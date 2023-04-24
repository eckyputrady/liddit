
import * as Profile from '../../components/profile/ProfileComponent'
import * as Link from '../../components/link/LinkComponent'
import * as m from './MicrositeState'

function MicrositePage() {
  const state = m.init();

  function onFormFieldChanged() {

  }

  function onFormAction() {

  }

  function componentOrEditView(state: m.State, id: string) {
    const c = state.componentById[id];
    switch (c.type) {
      case 'Profile':
        return c.edit ? (<Profile.EditView {...c.edit} onFormFieldChanged={onFormAction} onFormAction={onFormAction} />)
                      : (<Profile.View {...c.data} />);
      case 'Link':
        return c.edit ? (<Link.EditView {...c.edit} onFormFieldChanged={onFormAction} onFormAction={onFormAction} />)
                      : (<Link.View {...c.data} />);
      default:
        const _exhaustiveCheck: never = c;
    }
  }

  return (
    <div className="microsite">
      {state.order.map(id => componentOrEditView(state, id))}
    </div>
  )
}

export default MicrositePage;