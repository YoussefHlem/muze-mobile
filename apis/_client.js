import axiosIns from "../axios";

let client = axiosIns;

const reqMethods = [
  "request",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "patch",
];

let service = {};

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error("apiClient not installed");
    return client[method].apply(null, arguments);
  };
});

export const resource = (resourceUrl) => {
  return {
    get(params = {}) {
      return service.get(resourceUrl, { params });
    },
    show(id) {
      return service.get(`${resourceUrl}/${id}`);
    },
    create(data) {
      return service.post(resourceUrl, data);
    },
    update(id, data) {
      if (data instanceof FormData) {
        data.append("_method", "patch");
      } else {
        data["_method"] = "patch";
      }
      return service.post(`${resourceUrl}/${id}`, data);
    },
    remove(id) {
      return service.delete(`${resourceUrl}/${id}`);
    },
    removeAll(ids) {
      return service.delete(`${resourceUrl}/all`, { data: { ids } });
    },
  };
};

export default service;
