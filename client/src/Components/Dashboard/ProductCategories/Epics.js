import { baseUrl } from "../../../shared";

export const getCategories = cb => {
  baseUrl
    .get("api/catagory")
    .then(res => {
      if (res.status === 200) {
        console.log(res.data.categories)
        cb(res.data.categories);
        return;
      }
      const err = new Error(res.statusText + " : " + res.status);
      throw err;
    })
    .catch(err => {
      alert(err.message);
      cb([]);
    });
};

export const postRootCategory = (node, cb) => {
  baseUrl
    .post("api/catagory", { node })
    .then(res => {
      if (res.status === 200) {
        cb(res.data.categories);
        return;
      }
      const err = new Error(res.statusText + " : " + res.status);
      throw err;
    })
    .catch(err => {
      alert(err.message);
      cb([]);
    });
};

export const addChildCat = (parentPath, node, cb) => {
  baseUrl
    .post("api/catagory", { parentPath, node })
    .then(res => {
      if (res.status === 200) {
        cb(res.data.categories);
        return;
      }
      const err = new Error(res.statusText + " : " + res.status);
      throw err;
    })
    .catch(err => {
      alert(err.message);
      cb([]);
    });
};
