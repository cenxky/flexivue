import { Definition } from "../../lib/src/definition"

export interface ECMAScriptModule {
  __esModule: boolean
  default?: object
}

export function definitionsFromContext(context: __WebpackModuleApi.RequireContext): Definition[] {
  return context
    .keys()
    .map((key) => definitionForModuleWithContextAndKey(context, key))
    .filter(value => value) as Definition[]
}

function definitionForModuleWithContextAndKey(context: __WebpackModuleApi.RequireContext, key: string): Definition | undefined {
  var identifier = identifierForContextKey(key)
  if (identifier) {
    return definitionForModuleAndIdentifier(context(key), identifier)
  }
}

function definitionForModuleAndIdentifier(module: ECMAScriptModule, identifier: string): Definition | undefined {
  var instanceConstructor = module.default as any
  if (typeof instanceConstructor == "function") {
    return { identifier, instanceConstructor }
  }
}

export function identifierForContextKey(key: string): string | undefined {
  var logicalName = (key.match(/^(?:\.\/)?(.+)(?:\..+?)$/) || [])[1]
  if (logicalName) {
    return logicalName.replace(/\//g, "--")
  }
}
