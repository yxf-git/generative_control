import { fetchEventSource } from "@microsoft/fetch-event-source";
export class FetchSSE {
  private controller: AbortController;
  private url: string;

  constructor(url: string) {
    this.controller = new AbortController();
    this.url = url;
  }

  send(params : object , callbackFunction : Function ) {
    fetchEventSource(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": 'text/event-stream',
      },
      body: JSON.stringify(params),
      signal: this.controller.signal,
      onopen: (e): any => {
        // callbackFunction();
      },
      onmessage: (e) => {
        callbackFunction(e.data);
      },
      onerror: (err) => {
        // callbackFunction();
      },
      onclose: () => {
        // callbackFunction();
      },
    });
  }

  abort() {
    this.controller.abort()
  }
}
