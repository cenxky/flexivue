## Flexivue

Integrate Vue.js with Rails views and webpacker.

Flexivue is a flexible tool to use Vue with Rails. The benefits:

  - Lets you both use Rails views and Vue components
  - Lets you use ES6, TypeScript, CoffeeScript
  - Supports Webpacker

### Get started

Webpacker provides modern JS tooling for Rails. So we need to create a Rails project which which supports Vue first.

#### 1. Create a new Rails app

```
$ rails new my-project --webpack=vue
$ cd my-project
```

#### 2. Yarn add flexivue

```
$ yarn add flexivue
```

#### 3. Use Flexivue webpack-helpers to automatically load instances files from a folder in your app

```javascript
// app/javascript/packs/application.js
import Vue from "vue/dist/vue.esm"
import { Application } from "flexivue"
import { definitionsFromContext } from "flexivue/webpack-helpers"

const application = Application.initialize({ vue: Vue })
const context = require.context("instances", true, /\.js$/)

// Or addEventListener("turbolinks:load") if you use turbolinks
document.addEventListener("DOMContentLoaded", () => {
  application.load(definitionsFromContext(context))
})
```

#### 4. Create a Vue instance

```javascript
// app/javascript/instances/hello.js
import { Instance } from "flexivue"

export default class extends Instance {
  data = {
    name: "Flexivue"
  }
}
```

#### 5. Link the JavaScript pack in Rails view using javascript_pack_tag helper

```erb
<!-- app/views/layout/application.html.erb in Head tag -->
<%= javascript_pack_tag 'application' %>
```

#### 6. Render instance in a Rails view

```erb
<div instance="hello">
  <h1> Hello {{name}}</h1>
</div>
```

#### 7. You can also use Vue components

```vue
<!-- app/javascript/components/counter.vue -->
<template>
  <div class="counter">
    <span>{{count}}</span>
    <button @click="inc">+</button>
  </div>
</template>

<script>
  export default {
    data() {
      return { count: 0 }
    },
    methods: {
      inc() { this.count++ }
    }
  }
</script>
```

#### 8. Then update hello instance

```javascript
import { Instance } from "flexivue"
import Counter from "../components/counter.vue"

export default class extends Instance {
  data = {
    name: "Flexivue"
  }

  components = {
    "counter": Counter
  }
}
```

#### 9. Render instance with component in a Rails view

```erb
<div instance="hello" data={ greet: "Welcome!" }>
  <h1> Hello {{name}} </h1>
  <h1> {{greet}} </h1>
  <counter></counter>
</div>
```

### Instance file naming

Instance file Name | Instance name in Views
-----|-----
`app/javascript/instances/sampleinstance.js` | `<div instance="sampleinstance">`
`app/javascript/instances/sample_instance.js` | `<div instance="sample_instance">`
`app/javascript/instances/SampleInstance.js` | `<div instance="SampleInstance">`
`app/javascript/instances/namespace/sampleinstance.js` | `<div instance="namespace--sampleinstance">`

### Typescript support

Flexivue supports Typescript, just fell free to use it.

### License

Released under the MIT license. See LICENSE file for details.
