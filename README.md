# @dylan-ramos/js-class-hydrator

## Table of contents

- [Presentation](#Presentation)
- [Requirements](#Requirements)
- [Install](#Install)
- [Use](#Use)
- [Links](#Links)
- [Authors](#Authors)
- [Licenses](#Licenses)

## Presentation

This package provides a simple class hydration function.

## Requirements

This library requires :

- [@dylan-ramos/js-tool](https://github.com/dylan-ramos/js-tool.git)

for development :

- [babel](https://babeljs.io/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [yarn](https://yarnpkg.com/fr/)

## Install

```bash
$ yarn add dylan-ramos/js-class-hydrator
```

Or add "@dylan-ramos/js-class-hydrator" : "dylan-ramos/js-class-hydrator" to your "dependencies" in the packages.json file.

## Use

First, import the hydrate function into the JS file where you want to use it.

```js
import hydrate from '@dylan-ramos/js-class-hydrator'
// OR
import { hydrate } from '@dylan-ramos/js-class-hydrator'
```

Then assign it as the method of your class you wish to hydrate.

```js
class Foo {
  constructor(props = {}) {
    this.hydrate = hydrate
    this.hydrate(props)
  }
}
```

The hydrate function is generally used in the class constructor.

So if you declare your class by passing it an object that includes the name of the properties and the values to be assigned to them, then the values will automatically be assigned to the properties of your class using its setters.

```js
const foo = new Foo({
  property1: 'bar',
  property1: 'baz',
})
```

This avoids having to assign each property one by one in the class constructor.

```js
// ###> Without hydration function
class Foo {
  constructor(property1, property2 /* , ... */) {
    this.property1 = property1
    this.property2 = property2
    // ...
  }
}
// ###< Without hydration function

// ###> With hydration function
class Foo {
  constructor(props = {}) {
    this.hydrate = hydrate
    this.hydrate(props)
  }
}
// ###< With hydration function
```

## Links

- [dylan-ramos on GitHub](https://github.com/dylan-ramos)
- [GitHub](https://github.com/dylan-ramos/js-class-hydrator)
- [Issues](https://github.com/dylan-ramos/js-class-hydrator/issues)

## Authors

**Dylan Ramos** - [on GitHub](https://github.com/dylan-ramos)

## Licenses

MIT see LICENSE file
