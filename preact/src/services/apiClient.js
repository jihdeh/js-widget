import axios from './Axios';

// export const getContents = (appId) => {
//   return axios.get(`/v1/content?appId=${appId}`);
// };

export const getContents = (appId) => {
  return axios.get(`/?appId=${appId}`);
};