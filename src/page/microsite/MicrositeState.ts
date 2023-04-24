import { Profile, Link } from "../../model";
import bgUrl from '../../assets/bg.jpg'
import profpic from '../../assets/profpic.jpeg'

export type Component = { type: 'Profile', data: Profile, edit?: Profile } 
                      | { type: 'Link', data: Link, edit?: Link };

export interface State {
  order: string[],
  componentById: { [key: string]: Component },
}

export function init(): State {
  return {
    order: ['profile-0', 'link-0', 'link-1', 'link-2'],
    componentById: {
      'profile-0': {
        type: 'Profile',
        data: {
          id: 'profile-0',
          title: 'hello',
          subtitle: 'whoah',
          paragraph: 'this is a paragraph',
          bgUrl,
          profPicUrl: profpic
        }
      },
      'link-0': {
        type: 'Link',
        data: {
          id: 'link-0',
          text: 'WhatsApp',
          url: 'https://google.com',
          logo: 'whatsapp'
        }
      },
      'link-1': {
        type: 'Link',
        data: {
          id: 'link-1',
          text: 'WhatsApp',
          url: 'https://google.com',
          logo: 'whatsapp'
        }
      },
      'link-2': {
        type: 'Link',
        data: {
          id: 'link-2',
          text: 'WhatsApp',
          url: 'https://google.com',
          logo: 'whatsapp'
        }
      }
    }
  }
}

export function moveComponent(state: State, id: string, isMoveUp: boolean): State {
  const order = [...state.order]
  const idx = order.indexOf(id);
  if (isMoveUp) {
    const temp = order[idx];
    order[idx] = order[idx-1];
    order[idx-1] = temp;
  } else {
    const temp = order[idx];
    order[idx] = order[idx+1];
    order[idx+1] = temp;
  }
  return {
    ...state,
    order
  }
}

export function cancelEdit(state: State, id: string): State {
  return state;
  // const editById = {...state.editById};
  // delete editById[id];
  // return {
  //   ...state,
  //   editById
  // };
}

export function saveEdit(state: State, id: string): State {
  // const editById = {...state.editById};
  // const componentById = {...state.componentById};
  // componentById[id] = {...editById[id]};
  // delete editById[id];
  // return {
  //   ...state,
  //   componentById,
  //   editById
  // };

  return state;
}

export function deleteComponent(state: State, id: string): State {
  // const editById = {...state.editById};
  // delete editById[id];
  // const componentById = {...state.componentById};
  // delete componentById[id];
  // return {
  //   ...state,
  //   componentById,
  //   editById
  // }
  return state;
}

export function updateEditInput(state: State, id: string, field: string, value: string): State {
  // console.log('updateEditInput')
  // const d = state.editById[id].data as unknown as {[s: string]: string};
  // d[field] = value;
  // return {
  //   ...state
  // }
  return state;
}