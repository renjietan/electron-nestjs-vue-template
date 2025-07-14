# Vite + Electron + Nestjs Template
<!-- https://gitee.com/liuyuhui071127/electron-nestjs.git -->
- In the project folder:
  ```bash
  # install dependencies
  pnpm install

  # run in developer mode
  npm run dev

  # build
  pnpm run build
  ```

# 前后端通道
1，restful
~~~
http://localhost:3000/user

~~~


2，ipc通道

~~~ preload.js

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'electron',
  {
    sendMsg: (msg: string): Promise<string> => ipcRenderer.invoke('msg', msg),
    onReplyMsg: (cb: (msg: string) => any) => ipcRenderer.on('reply-msg', (e, msg: string) => {
      cb(msg)
    }),
  },
)


~~~

~~~vue
const { sendMsg: sendMsgToMainProcess, onReplyMsg } = window.electron

async function sendMsg() {
  try {
    log.value += `[render]: ${msg.value} \n`
    const data = await sendMsgToMainProcess(msg.value)
    log.value += `[main]: ${data}  \n`
  }
  catch (error) {
    console.error(error)
  }
}

onReplyMsg((msg: string) => {
  log.value += `[main]: ${msg}  \n`
})
~~~

~~~ nestjs

  @IpcHandle('msg')
  public handleSendMsg(@Payload() msg: string): Observable<string> {
    const { webContents } = this.mainWin

    mainCC.test = msg


    webContents.send('reply-msg', 'this is msg from webContents.send')
    return of(`The main process received your message: ${msg} at time: ${this.appService.getTime()}`)
  }

~~~

