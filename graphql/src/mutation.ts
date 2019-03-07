import Axios from "axios";

const Mutation = {
  commentOnExpense: async (parent, { id, comment }, ctx) => {
    const response = await Axios.post(`${ctx.baseURL}/expenses/${id}`, {
      comment
    });
    return response.data;
  }
};

export default Mutation;
