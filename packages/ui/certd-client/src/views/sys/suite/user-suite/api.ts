import { request } from "/src/api/service";

export function createApi() {
  const apiPrefix = "/sys/suite/user-suite";
  return {
    async GetList(query: any) {
      return await request({
        url: apiPrefix + "/page",
        method: "post",
        data: query
      });
    },

    async AddObj(obj: any) {
      return await request({
        url: apiPrefix + "/add",
        method: "post",
        data: obj
      });
    },

    async UpdateObj(obj: any) {
      return await request({
        url: apiPrefix + "/update",
        method: "post",
        data: obj
      });
    },

    async DelObj(id: number) {
      return await request({
        url: apiPrefix + "/delete",
        method: "post",
        params: { id }
      });
    },

    async GetObj(id: number) {
      return await request({
        url: apiPrefix + "/info",
        method: "post",
        params: { id }
      });
    },
    async ListAll() {
      return await request({
        url: apiPrefix + "/all",
        method: "post"
      });
    },

    async GetSimpleUserByIds(ids: number[]) {
      return await request({
        url: "/sys/authority/user/getSimpleUserByIds",
        method: "post",
        data: { ids }
      });
    }
  };
}

export const pipelineGroupApi = createApi();