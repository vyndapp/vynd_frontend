import * as actionTypes from '../actions/videos';

const initialState = {
  videoIds: []
};

const videos = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_VIDEOIDS:
      return {
        ...state,
        videoIds: action.videoIds
      };
    case actionTypes.ADD_VIDEOID:
      return {
        ...state,
        videoIds: state.videoIds.concat({
          videoId: action.videoId,
          videoExt: action.videoExt
        })
      };
  }
  return state;
};

export default videos;
