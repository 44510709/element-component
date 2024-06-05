import axios from "axios";

// 上传文件
export const upload = (formData) => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/file/upload",
    method: "POST",
    data: formData,
    headers: {
      ContentType: "multipart/form-data",
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};

export const list = (data) => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/user/page/list",
    method: "GET",
    params: data,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};
export const list2 = (data) => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/platform/list",
    method: "GET",
    params: data,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};

export const del = (data) => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/questionLib/delete",
    method: "POST",
    params: data,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};

export const insert = (data) => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/questionLib/insert",
    method: "POST",
    params: data,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};

export const treelist = () => {
  return axios({
    url: "https://guap-test.gwm.com.cn/marketing-backend-api/system/menu/treeselect",
    method: "GET",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1MjYwMTA0LTIwNGMtNDhkOC04NzkxLTQyOGFkNTlhMjRiYSJ9.5ZnURq2TA94llU2OcPq4rFb3MYu1NLawyjxeSSlcv2KoCVKO9jdu3VyglTJqiI3iqbyL6rLwkFBPTTH9Q7qo8Q",
    },
  });
};
