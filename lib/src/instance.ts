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

  _load(element: HTMLElement) {
    let dataset: { [key: string]: any } = {}
    let givenData = this._tryToParse(element.getAttribute('data')) || element.dataset

    for (var key in givenData) {
      dataset[key] = this._tryToParse(givenData[key])
    }

    this.data = { ...this.data, ...dataset }
    this.el = element

    let plainInstance: PlainInstance = {}
    let funsFrom: any[] = [this, this.__proto__]

    funsFrom.forEach((obj) => {
      Object.getOwnPropertyNames(obj).forEach(name => {
        plainInstance[name] = obj[name]
      })
    })

    return plainInstance
  }

  _tryToParse(value: any) {
    try {
      return JSON.parse(value as string)
    } catch(error) {
      return value
    }
  }
}
