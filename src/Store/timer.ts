import { isFunction } from 'lodash'
import { observable } from 'mobx'

class TimerStore {
  @observable
  private _events: Map<string, any> = new Map()

  async on(name: string, method: () => void, interval: number){
    if (!isFunction(method) || this._events.has(name)) {
      return
    }
    await method()
    const timer = setInterval(method, interval)
    this._events.set(name, timer)
  }

  asyncOn(name: string, method: () => void, interval: number): void {
    if (!isFunction(method)) {
      return
    }
    let isRunning = false

    const run = async () => {
      if (isRunning) {
        return
      }
      isRunning = true
      await method()
      isRunning = false
    }
    const timer = setInterval(run, interval)
    this._events.set(name, timer)
  }

  off(name: string) {
    clearInterval(this._events.get(name)!)
    this._events.delete(name)
  }

  clear() {
    for (const timer of this._events.keys()) {
      this.off(timer)
    }
    this._events.clear()
  }
}

export default TimerStore
