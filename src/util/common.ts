export const getAssetsFiles = (url: string) => {
  return new URL(`../assets/img/${url}`, import.meta.url).href;
};
export const getAssetsNewFiles = (url: string) => {
  const iconPath = `/api/icon/${url}`;
  return new URL(iconPath, import.meta.url);
};
export const dataFixed = (data: Array<any>) => {
  if (data.length < 1) {
    return
  }
  if (data.length > 15) {
    data = data.splice(0, 15)
  }
  let finalData: any = [];
  data.map(res => {
    finalData.push({
      item: res[0],
      value: res[1]
    })
  })
  return finalData;
}


// 通过ID滚动到固定元素
export function scrollIntoViewById(id: string) {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}

// 打字机队列
export class Typewriter {
  private queue: string[] = [];
  private consuming = false;
  private timmer: any;
  private speed = 50;
  constructor(private onConsume: (str: string) => void) { }
  // 输出速度动态控制
  dynamicSpeed() {
    return this.speed;
    // const speed = 1000 / this.queue.length;
    // if (speed > 200) {
    //   return 200;
    // } else {
    //   return speed;
    // }
  }
  // 添加字符串到队列
  add(str: string) {
    if (!str) return;
    if (str === "[end]") {
      this.queue.push("[end]")
      return
    }
    this.queue.push(...str.split(""));
  }
  // 消费
  consume() {
    if (this.queue.length > 0) {
      const str = this.queue.shift();
      str && this.onConsume(str);
    }
  }
  // 消费下一个
  next() {
    // console.log("this is next speed",this.dynamicSpeed())
    this.consume();
    // 根据队列中字符的数量来设置消耗每一帧的速度，用定时器消耗
    if (this.timmer) {
      clearTimeout(this.timmer);
      this.timmer = null
    }
    this.timmer = setTimeout(() => {
      this.consume();
      if (this.consuming) {
        this.next();
      }
    }, this.dynamicSpeed());
  }
  // 开始消费队列
  start() {
    this.consuming = true;
    this.next();
  }

  // 中止消费队列
  abort() {
    this.consuming = false;
    if (this.timmer) {
      clearTimeout(this.timmer);
      this.timmer = null
    }
    this.queue = [];
  }

  // 结束消费队列
  done() {
    this.consuming = false;
    if (this.timmer) {
      clearTimeout(this.timmer);
      this.timmer = null
    }
    // 把queue中剩下的字符一次性消费
    this.onConsume(this.queue.join(""));
    this.queue = [];
  }

  setSpeed(num: number) {
    this.speed = num;
  }
}

// 打字机队列 - 文档大师
export class DocTypewriter {
  private queue: string[] = [];
  private consuming = false;
  private timmer: any;
  private speed = 20;
  constructor(private onConsume: (str: string) => void) { }
  // 输出速度动态控制
  dynamicSpeed() {
    const speed = 1000 / this.queue.length;
    if (speed > 200) {
      return 200;
    } else if (speed < 16.67) {
      return 16.67;
    } else {
      return speed;
    }
  }
  // 添加字符串到队列
  add(str: string) {
    if (!str) return;
    if (str === "[end]") {
      this.queue.push("[end]")
      return
    }
    this.queue.push(...str.split(""));
  }
  // 消费
  consume() {
    if (this.queue.length > 0) {
      const str = this.queue.shift();
      str && this.onConsume(str);
    }
  }
  // 开始消费队列
  start() {
    this.timmer = setInterval(() => {
      this.consume();
    }, 50);
  }

  // 中止消费队列
  abort() {
    this.consuming = false;
    if (this.timmer) {
      clearInterval(this.timmer);
      this.timmer = null
    }
    this.queue = [];
  }

  // 结束消费队列
  done() {
    if (this.timmer) {
      clearInterval(this.timmer);
      this.timmer = null
    }
    // 把queue中剩下的字符一次性消费
    this.onConsume(this.queue.join(""));
    this.queue = [];
  }

  setSpeed(num: number) {
    this.speed = num;
  }
}

export function chatLogToString(params: any) {
  console.log("this is common chatLogToString", JSON.stringify(params))
  if (!params || params.length < 1) {
    return ""
  }
  let str = ""
  params.map((res: any, index: number) => {
    JSON.stringify(res) == "{}" ? "" : res.type == "user" ? str += "\nUSER:" + res.content : str += "\nASSISTANT:" + res.content;
    // if(res.type == "user"){
    //   str += "\\nUSER:" + res.content;
    // }else if(res.type == "robot"){
    //   str += "\\nASSISTANT:" + res.content
    // }
  })
  return str;
}

export function chatLogToString2(params: any) {
  console.log("this is common chatLogToString2", JSON.stringify(params))
  if (!params || params.length < 1) {
    return ""
  }
  let str = ""
  params.map((res: any, index: number) => {
    if (params.length - 1 > index) {
      JSON.stringify(res) == "{}" ? "" : res.type == "user" ? str += "\\nUSER:[img-10]" + res.content : str += "\\nASSISTANT:" + res.content;
    }
  })
  return str;
}


/**
 * 生成uuid
 * @returns
 */
export const generateUUID = (): string => {
  var uuid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    uuid += n;
    if (i == 8 || i == 12 || i == 16 || i == 20) uuid += "-";
  }
  return uuid;
};

// 获取动态图片url
export const getImgUrl = (path: string) => {
  return new URL(`../assets/img/${path}`, import.meta.url).href;
}

// 深拷贝
export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepCopy(item)) as any;
  }

  if (obj instanceof Object) {
    const copiedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copiedObj[key] = deepCopy(obj[key]);
      }
    }
    return copiedObj;
  }

  return obj;
}

// 根据文件，获取文件名称
export function getFileName(file: any): string {
  let fileName = ""
  if (file.name || file.doc_name || file.response.doc_name) {
    fileName = file.name || file.doc_name || file.response.doc_name
    return fileName
  } else {
    return ""
  }
}

// 根据文件，获取文件url
export function getFileUrl(file: any): string {
  let fileUrl = ""
  if (file.url || file.doc_url || file.response.doc_url) {
    fileUrl = file.url || file.doc_url || file.response.doc_url
    return fileUrl
  } else {
    return ""
  }
}

// 根绝文件内容，获取文件类型
export function getFileTypeByFile(file: any): string {
  let fileName = ""
  if (file.name || file.doc_name || file.response.doc_name) {
    fileName = file.name || file.doc_name || file.response.doc_name
  } else {
    return ""
  }
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') {
    return 'pdf';
  } else if (ext === 'txt') {
    return 'txt';
  } else if (ext === 'docx' || ext === 'doc') {
    return 'word';
  } else if (ext === 'xls' || ext === 'xlsx') {
    return 'excel';
  } else if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'ico' || ext === 'gif') {
    return 'image';
  } else {
    return 'other';
  }
}

// 根据文件名称获取文件类型
export function getFileTypeByName(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') {
    return 'pdf';
  } else if (ext === 'txt') {
    return 'txt';
  } else if (ext === 'docx' || ext === 'doc') {
    return 'word';
  } else if (ext === 'xls' || ext === 'xlsx') {
    return 'excel';
  } else if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'ico' || ext === 'gif') {
    return 'image';
  } else {
    return 'other';
  }
}

export function findObjectById(id: any, data: any) {
  return data.find((item: any) => item.id === id);
}