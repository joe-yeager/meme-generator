import { generateTextInputs, formatMemesForSelectInput } from './MemeUtils';

export function memeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_MEME_OPTIONS':
      return {
        ...state,
        options: formatMemesForSelectInput(action.freshMemes),
        memes: action.freshMemes,
        selectedMeme: action.freshMemes[0],
        imageUrl: action.freshMemes[0].url,
        inputs: generateTextInputs(
          action.freshMemes[0],
          state.boxes,
          action.boxesUpdater
        ),
      };
    case 'SHOW_MEME':
      return {
        ...state,
        error: null,
        imageUrl: action.url,
        loading: false,
      };
    case 'SELECT_NEW_MEME':
      return {
        ...state,
        boxes: {},
        selectedMeme: action.newMeme,
        imageUrl: action.newMeme.url,
        inputs: generateTextInputs(
          action.newMeme,
          state.boxes,
          action.boxesUpdater
        ),
        dankness: null,
        error: null,
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'UPDATE_DANKNESS':
      return {
        ...state,
        dankness: action.dankness,
      };
    case 'UPDATE_BOXES': {
      return {
        ...state,
        boxes: { ...state.boxes, ...action.boxes },
      };
    }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return { ...state };
  }
}
