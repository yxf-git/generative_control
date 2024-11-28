import { sendGet, sendPost, sendPostCanAbort } from "./request";
import { handleFetchEventSource } from "../util/request";
import { FetchSSE } from "../util/fetchSSE"
import { useMessageStore } from "../store/modules/message";
import { List } from "echarts";

export function requestFileList(params: any): Promise<any> {
  if (params.length == 0) {
    params = [0, 1, 2];
  }
  return new Promise((resolve, reject) => {
    const url = "/api/follow-up/listFile";
    sendPost(
      url,
      params,
      {},
      (res: { data: any }) => {
        resolve(res.data.data);
      },
      (err: any) => {
        reject(err);
      }
    );
  });
}

// 获取sessionid
export function getSessionId(data:string):Promise<any> {
  return new Promise((resolve, reject) => {
    const url = "/api/doc/chat/create/"+data;
    sendGet(
        url,
        {},
        (res: { data: any }) => {
          resolve(res.data);
        },
        (err: any) => {
          reject(err);
        }
    );
  });
}