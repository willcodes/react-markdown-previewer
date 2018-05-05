import { FETCH_DOCUMENTS } from "../../constants";
import axios from "axios";
import config from "../../config";

export const fetchDocuments = () => (dispatch, getState) => {
  const token = localStorage.getItem("token");
  axios
    .get(`${config.base_url}/api/documents/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
        console.log(res);
      if (res.status != 200) {
        dispatch({ type: "LOG_OUT" });
      } else if (res.status == 200 && res.data != null) {
        dispatch({ type: FETCH_DOCUMENTS, payload: res.data });
      }
    });
};
