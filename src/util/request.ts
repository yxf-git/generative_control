import { fetchEventSource } from "@microsoft/fetch-event-source";
export function handleFetchEventSource(
  url: string,
  params: Object,
  onmessage: Function,
  onclose: Function = () => { }, // 添加一个可选参数 options
  onerror: Function = () => { }, // 添加一个可选参数 options
  onopen?: Function
) {
  // 这里需要添加一个onclose参数
  let controller = new AbortController();
  fetchEventSource(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": 'text/event-stream',
      "token": localStorage.getItem("token") || '',
    },
    body: JSON.stringify(params),
    signal: controller.signal,
    onopen: (e): any => {
      console.log("fetchEventSource：open", e);
      if (e.status >= 400) {
        onerror({
          ...e,
          message: `服务环境异常 ${e.status}`
        });
        return
      }
      if (onopen) {
        onopen(controller as AbortController)
      }
    },
    onmessage: (e) => {
      // console.log("fetchEventSource：message", e);
      onmessage(e.data);
    },
    onerror: (err) => {
      console.log("fetchEventSource：error", err);
      onerror(err);
    },
    onclose: () => {
      console.log("fetchEventSource：close");
      onclose();
    },
  });
}
