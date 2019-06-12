import axios from '../axios';

export const INIT_VIDEOIDS = 'INIT_VIDEOIDS';
export const ADD_VIDEOID = 'ADD_VIDEOID';
export const VIDEO_LOADING = 'VIDEO_LOADING';

export const initVideoIds = () => {
  return async dispatch => {
    dispatch({ type: VIDEO_LOADING, loading: true });
    const newRes = await axios.get('/api/get-processed-videos');
    const videoIds = newRes.data.processed_videos_results.map(video => {
      return { videoId: video.video_id, videoExt: video.extension };
    });
    dispatch({ type: VIDEO_LOADING, loading: false });
    dispatch({ type: INIT_VIDEOIDS, videoIds });

    // const res = await axios.get(
    //   'https://vynd-5222f.firebaseio.com/videoIds.json'
    // );
    // const videoIds = res.data.concat();
    // dispatch({ type: INIT_VIDEOIDS, videoIds });
  };
};

export const addVideoId = ({ videoId, videoExt }) => {
  return {
    type: ADD_VIDEOID,
    videoId,
    videoExt
  };
};

export const searchVideoName = person => {
  return async dispatch => {
    dispatch({ type: VIDEO_LOADING, loading: true });
    try {
      const res = await axios.get('/api/get-videos-of-face', {
        params: {
          ...person
        }
      });
      const newVideoIds = res.data.videos.map(video => ({
        videoExt: video.extension,
        videoId: video.video_id
      }));
      dispatch({ type: INIT_VIDEOIDS, videoIds: newVideoIds });
    } catch (err) {
      console.log('Fail');
      console.log(err);
    }
    dispatch({ type: VIDEO_LOADING, loading: false });
  };
};
