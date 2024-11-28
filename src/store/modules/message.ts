import { defineStore } from "pinia";
import { dataFixed, Typewriter } from "../../util/common";
import {
  requestFileList,
  getLLMChat,
  favorite, getSessionId, opinion,
} from "../../http/api";
import { nextTick } from "vue";

export interface Dialogue {
  question: string;
  answer: string;
  fileInfo:FileAttr;
  messageId:string
  reward:number
}
interface FileAttr {
  fileName: string;
  ossUrl: string;
  infoNumber:number;
}
export const useMessageStore = defineStore("message", {
  state: () => ({
    // 对话列表
    dialogueList: [] as Dialogue[],
    // 当前选中的文件ID
    selectedFile: "",
    // 是否不可分析
    isAnalysisDisabled: false,
    // 用于展示打字机效果和语音转文本，对话最后一条
    currentDialogue: <Dialogue>{
      question: "",
      answer: "",
      fileInfo: {
        fileName:"",
        ossUrl:"",
        infoNumber:0
      },
      messageId:"",
      reward:-1
    },
    getLLMClass : getLLMChat(),
    curTyperWriter: new Typewriter(() => {}),
  }),
  getters: {
  },
  actions: {
    /**修改打字速度**/
    changeSpeedForShow(num: number) {
      // @ts-ignore
      this.curTyperWriter.setSpeed(num);
    },
    /**打印结束**/
    writerDone(){
      this.curTyperWriter.done();
    },

    /**获取聊天返回 带跑马灯**/
    getLLmAnswer(params: any) {
      let _that = this
      console.log("message getLLmAnswer",params)
      return new Promise((resolve, reject) => {
        _that.curTyperWriter = new Typewriter((str: string) => {
          if (str === "&") {
            _that.curTyperWriter.done();
            resolve(true);
            return;
          }
          _that.currentDialogue.answer += str || "";
          // console.log("_that.currentDialogue.answer",_that.currentDialogue.answer)
        });
        _that.curTyperWriter.start();
        //获取模型返回
        _that.getLLMClass.send(params, (text: string) => {
          if (/^[\s]*\{[\s\S]*\}[\s]*$/.test(text)) {
            let textObject = JSON.parse(text);
            console.log("textObject",textObject)
            if (textObject.content === "[done]") {
              _that.curTyperWriter.add("&");
              _that.currentDialogue.messageId = textObject.metadata.message_id || ""
              if(textObject?.metadata.doc_name){
                _that.currentDialogue.fileInfo = {
                  fileName:textObject.metadata.doc_name || "",
                  ossUrl:"https://storage.gczx.cn/regulation/"+textObject.metadata.doc_name,
                  infoNumber:textObject.metadata.page_number
                }
              }
              // resolve(true);
              // return;
            }else{
              _that.curTyperWriter.add(textObject.content.replace(/\n/g, '<br>'));
            }
          }
        });
      });
    },

    /**创建会话**/
    createSession(data:string){
      return new Promise((resolve, reject) => {
        getSessionId(data).then(res =>{
          resolve(res)
        })
      })
    },

    /**保存奖赏**/
    favorite(params:any){
      return new Promise((resolve, reject) => {
        favorite(params).then(res =>{
          resolve(res)
        })
      })
    },

    /**问题提交**/
    opinion(params:any){
      return new Promise((resolve, reject) => {
        opinion(params).then(res =>{
          resolve(res)
        })
      })
    },


    /**重置**/
    resetDialogue() {
      // console.log("清空对话列表")
      this.dialogueList = []
      this.currentDialogue = <Dialogue>{
        question: "",
        answer: "",
        fileInfo: {},
      };
    }
  },
});
