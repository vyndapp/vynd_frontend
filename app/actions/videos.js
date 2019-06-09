import axios from '../axios';

export const INIT_VIDEOIDS = 'INIT_VIDEOIDS';
export const ADD_VIDEOID = 'ADD_VIDEOID';

export const initVideoIds = videoIds => {
  return {
    type: INIT_VIDEOIDS,
    videoIds
  };
};

export const addVideoId = videoId => {
  return {
    type: ADD_VIDEOID,
    videoId
  };
};

export const searchVideoName = () => {
  return async dispatch => {
    // Actual request will be done here
    const newVideoIds = await axios.get('/videosId.json');
    dispatch(initVideoIds([1, 2, 3]));
  };
};
