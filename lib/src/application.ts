import Vue, { VueConstructor } from 'vue'
import { Instance } from './instance'
import { Definition } from "./definition"

interface OptionsType {
  vue?: VueConstructor
}

export class Application {
  private vueClass: VueConstructor

  static initialize(options: OptionsType) {
    return new Application(options)
  }

  constructor(options: OptionsType) {
    this.vueClass = options.vue || Vue
    this.vueClass.prototype.$instances || (this.vueClass.prototype.$instances = {})
  }

  load(contexts: Definition[]) {
    contexts.forEach(context => {
      let identifier: string = context.identifier
      let instance: Instance = context.instanceConstructor.initialize()

      let selector: any = instance.el || `[instance='${identifier}']`
      let element: HTMLElement | null = document.querySelector(selector)

      if(element) {
        let vueInstance: Vue = new this.vueClass(instance._load(element))
        this.vueClass.prototype.$instances[identifier] = vueInstance

        // Update [instance="your-instance"] to [loaded-intance="your-instance"]
        vueInstance.$el.removeAttribute("instance")
        vueInstance.$el.setAttribute("loaded-intance", identifier)
      }
    })
  }
}
