import { CallStatus, NAME, CallRole } from '../const/index';
import { IBellParams } from '../interface/index';
import { isUndefined } from '../utils/common-utils';
import DEFAULT_CALLER_BELL_FILEPATH from '../assets/phone_dialing.mp3';
import DEFAULT_CALLEE_BELL_FILEPATH from '../assets/phone_ringing.mp3';

export class BellContext {
  private _bellContext: any = null;
  private _isMuteBell: boolean = false;
  private _calleeBellFilePath: string = DEFAULT_CALLEE_BELL_FILEPATH;
  private _callRole: string = CallRole.UNKNOWN;
  private _callStatus: string = CallStatus.IDLE;

  constructor() {
    // @if process.env.BUILD_TARGET!='MINI'
    this._bellContext = new Audio();
    // @endif
    // @if process.env.BUILD_TARGET='MINI'
    // @ts-ignore
    this._bellContext = wx.createInnerAudioContext();
    this._addListenBellContextEvent();
    // @endif
    this._bellContext.loop = true;
  }

  setBellSrc() {
    // @if process.env.BUILD_TARGET='MINI'
    // @ts-ignore
    const fs = wx.getFileSystemManager();
    // @endif
    try {
      let playBellFilePath = DEFAULT_CALLER_BELL_FILEPATH;
      if (this._callRole === CallRole.CALLEE) {
        playBellFilePath = this._calleeBellFilePath || DEFAULT_CALLEE_BELL_FILEPATH;
      }
      // @if process.env.BUILD_TARGET='MINI'
      fs.readFileSync(playBellFilePath, 'utf8', 0);
      // @endif
      this._bellContext.src = playBellFilePath;
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to setBellSrc, ${error}`);
    }
  }

  setBellProperties(bellParams: IBellParams) {
    this._callRole = bellParams.callRole || this._callRole;
    this._callStatus = bellParams.callStatus || this._callStatus;
    this._calleeBellFilePath = bellParams.calleeBellFilePath || this._calleeBellFilePath;
    // undefined/false || isMuteBell => isMuteBell (不符合预期)
    this._isMuteBell = isUndefined(bellParams.isMuteBell) ? this._isMuteBell : bellParams.isMuteBell;
  }

  async play() {
    try {
      if (this._callStatus !== CallStatus.CALLING) {
        return ;
      }
      this.setBellSrc();
      if (this._callRole === CallRole.CALLEE && !this._isMuteBell) {
        await this._bellContext.play();
      }
      if (this._callRole === CallRole.CALLER) {
        await this._bellContext.play();
      }
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to play audio file, ${error}`);
    }
  }

  async stop() {
    try {
      // @if process.env.BUILD_TARGET!='MINI'
      await this._bellContext.pause();
      // @endif
      // @if process.env.BUILD_TARGET='MINI'
      this._bellContext.stop();
      // @endif
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to stop audio file, ${error}`);
    }
  }

  async setBellMute(enable: boolean) {
    if (this._callStatus !== CallStatus.CALLING && this._callRole !== CallRole.CALLEE) {
      return;
    }
    if (enable) {
      await this.stop();
    } else {
      await this.play();
    }
  }

  destroy() {
    try {
      this._isMuteBell = false;
      this._calleeBellFilePath = '';
      this._callRole = CallRole.UNKNOWN;
      this._callStatus = CallStatus.IDLE;
      // @if process.env.BUILD_TARGET!='MINI'
      this._bellContext.pause();
      // @endif
      // @if process.env.BUILD_TARGET='MINI'
      this?._removeListenBellContextEvent();
      this._bellContext.destroy();
      // @endif
      this._bellContext = null;
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to destroy, ${error}`);
    }
  }
  
  // @if process.env.BUILD_TARGET='MINI'
  private _handleAudioInterruptionBegin = async () => {
    await this.stop();
  };
  
  private _handleAudioInterruptionEnd = async () => {
    if (this._callStatus !== CallStatus.CALLING) {
      await this.stop();
    } else {
      await this.play();
    }
  };

  private _addListenBellContextEvent() {
    // @ts-ignore
    wx.onAudioInterruptionBegin(this._handleAudioInterruptionBegin);
    // @ts-ignore
    wx.onAudioInterruptionEnd(this._handleAudioInterruptionEnd);
  }
  
  private _removeListenBellContextEvent() {
    // @ts-ignore
    wx.offAudioInterruptionBegin(this._handleAudioInterruptionBegin);
    // @ts-ignore
    wx.offAudioInterruptionEnd(this._handleAudioInterruptionEnd);
  }
  // @endif
}
