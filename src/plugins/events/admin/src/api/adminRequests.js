import axios from 'axios';

export const getEvents = async () => {
  try {
    const response = await axios.get('/admin/events/events/names');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default {
  getEvents,
};
