import axios from "axios";
import { Toast } from "../components/Toast";

export const getApi = async (url: string) => {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("auth") ?? "";
  }
  const options = {
    headers: {
      Authorization: `Bearer ${data}`,
      "Access-Control-Allow-Origin": "*",
      " X-Content-Type-Options": "nosniff",
    },
  };

  try {
    return await axios
      .get(process.env.NEXT_PUBLIC_API_URL + url, options)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.replace("/login");
          localStorage.clear();
          Toast({ title: "Session Timeout", error: true });
        }
        return err;
      });
  } catch (err: any) {
    console.error("err", err);
    return err.response;
  }
};

export const postApi = async (url: string, payload: any) => {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("auth") ?? "";
  }
  const options = {
    headers: {
      Authorization: `Bearer ${data}`,
      "Access-Control-Allow-Origin": "*",
      " X-Content-Type-Options": "nosniff",
    },
  };
  const response = await axios
    .post(process.env.NEXT_PUBLIC_API_URL + url, payload, options)
    .then((res) => res.data)
    .catch((err) => {
      console.error("error msg: ", err);
      return err;
    });
  return response;
};
export const patchApi = async (url: string, payload?: any) => {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("auth") ?? "";
  }
  const options = {
    headers: {
      Authorization: `Bearer ${data}`,
      "Access-Control-Allow-Origin": "*",
      " X-Content-Type-Options": "nosniff",
    },
  };
  const response = await axios
    .patch(process.env.NEXT_PUBLIC_API_URL + url, payload, options)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("err");
      }
    })
    .catch((err) => {
      console.error("error msg: ", err);
      return err;
    });
  return response;
};
export const putApi = async (url: string, payload?: any) => {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("auth") ?? "";
  }
  const options = {
    headers: {
      Authorization: `Bearer ${data}`,
      "Access-Control-Allow-Origin": "*",
      " X-Content-Type-Options": "nosniff",
    },
  };
  const response = await axios
    .put(process.env.NEXT_PUBLIC_API_URL + url, payload, options)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("err");
      }
    })
    .catch((err) => {
      console.error("error msg: ", err);
      return err;
    });
  return response;
};

export const deleteApi = async (url: string) => {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("auth") ?? "";
  }
  const options = {
    headers: {
      Authorization: `Bearer ${data}`,
      "Access-Control-Allow-Origin": "*",
      " X-Content-Type-Options": "nosniff",
    },
  };
  const response = await axios
    .delete(process.env.NEXT_PUBLIC_API_URL + url, options)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("err");
      }
    })
    .catch((err) => {
      console.error("error msg: ", err);
      return err;
    });
  return response;
};
