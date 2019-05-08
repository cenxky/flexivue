export interface InstanceConstructor {
  initialize(): Instance
  new(): Instance
}

interface PlainInstance {
  [key: string]: any
}

export class Instance {
  __proto__: any
  public el?: string | HTMLElement
  public data: any = {}

  static initialize() {
    return new this()
  }

  load(element: HTMLElement) {
    this.el = element
    this.data = { ...this.data, ...element.dataset }

    let plainInstance: PlainInstance = {}
    let funsFrom: any[] = [this, this.__proto__]

    funsFrom.forEach((obj) => {
      Object.getOwnPropertyNames(obj).forEach(name => {
        plainInstance[name] = obj[name]
      })
    })

    return plainInstance
  }
}
