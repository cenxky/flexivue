export interface InstanceConstructor {
  initialize(): Instance
  new(): Instance
}

export class Instance {
  public el?: string | HTMLElement
  public data: any = {}

  static initialize() {
    return new this()
  }

  load(element: HTMLElement) {
    this.el = element
    this.data = { ...this.data, ...element.dataset }
    return this
  }
}
