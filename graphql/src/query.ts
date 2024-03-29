import axios from "axios";

const Query = {
  expenses: async (parent, { skip, first }, ctx) => {
    const response = await axios.get(
      `${ctx.baseURL}/expenses?offset=${skip}&limit=${first}`
    );
    return {
      nodes: response.data.expenses,
      count: response.data.total
    };
  },
  expense: async (parent, { id }, ctx) => {
    const response = await axios.get(`${ctx.baseURL}/expenses/${id}`);
    return response.data;
  }
};

export default Query;
