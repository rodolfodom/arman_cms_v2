import axios from 'axios';

export const getEvents = async () => {
  try {
    const response = await axios.get('/events/names');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default {
  getEvents,
};
