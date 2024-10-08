import axios from "axios";
import { getFetchClient } from "@strapi/helper-plugin";

const client = getFetchClient();

const getEvents = async () => {
  try {
    const response = await client.get("/events/names");
    return response.data;
  } catch (error) {
    return [];
  }
};

const callRoll = async (uid, event) => {
  try {
    const response = await client.put(`/events/call-roll/${uid}`, {
      event,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getEvents,
  callRoll
};
