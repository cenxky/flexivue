import Vue, { VueConstructor } from 'vue'
import { Instance } from './instance'
import { Definition } from "./definition"

interface OptionsType {
  vue?: VueConstructor
}

interface Flexivue extends Vue {
  $instances: Object
}

export class Application {
  static instances: any = {}
  private vueClass: VueConstructor

  static initialize(options: OptionsType) {
    return new Application(options)
  }

  constructor(options: OptionsType) {
    this.vueClass = options.vue || Vue
  }

  load(contexts: Definition[]) {
    contexts.forEach(context => {
      let identifier: string = context.identifier
      let instance: Instance = context.instanceConstructor.initialize()

      let selector: any = instance.el || `[instance='${identifier}']`
      let element: HTMLElement | null = document.querySelector(selector)

      if(element) {
        let vueInstance: Flexivue = new this.vueClass(instance.load(element))
        vueInstance.$instances = Application.instances
        Application.instances.identifier = vueInstance
      }
    })
  }
}
