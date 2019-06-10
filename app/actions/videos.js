import axios from '../axios';

export const INIT_VIDEOIDS = 'INIT_VIDEOIDS';
export const ADD_VIDEOID = 'ADD_VIDEOID';

export const initVideoIds = () => {
  return async dispatch => {
    const res = await axios.get('/videoIds.json');
    const videoIds = res.data.concat();
    dispatch({ type: INIT_VIDEOIDS, videoIds });
  };
};

export const addVideoId = videoId => {
  return {
    type: ADD_VIDEOID,
    videoId
  };
};

export const searchVideoName = personName => {
  return async dispatch => {
    // Actual request will be done here
    const newVideoIds = await axios.get('/videosId.json');
    const dummyIds = [1, 2, 3];
    if (personName === '') {
      dummyIds.push(4);
      dummyIds.push(5);
    }
    dispatch({ type: INIT_VIDEOIDS, videoIds: dummyIds });
  };
};
