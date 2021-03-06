import hb from './index.js'

// this just removes the script tag for aesthetics
document.body.innerHTML = ''

// compile html
var div = hb('<div>')
document.body.appendChild(div)
console.log(document.body.outerHTML) // => <body><div></div></body>

// plain text
hb(div, {
  $text: 'cool'
})
// shorthand: hb(div, 'cool')
console.log(div.outerHTML) // => <div>cool</div>

// hypertext
hb(div, {
  $html: '<h1>hi</h1>'
})
console.log(div.outerHTML) // => <div><h1>hi</h1></div>

// attributes
hb(div, {
  $attr: {
    'my-attr': 42 // or null to remove
  }
})
console.log(div.outerHTML) // => <div my-attr="42"><h1>hi</h1></div>

// classes
hb(div, {
  $class: {
    'my-class': true // or falsy to remove
  }
})
console.log(div.outerHTML) // => <div my-attr="42" class="my-class"><h1>hi</h1></div>

// properties
document.body.innerHTML = '<input value=initial>'
hb(document.body, {
  input: {
    $prop: {
      value: 'updated'
    }
  }
})
console.log(document.querySelector('input').value) // => updated

// elements
hb(document.body, {
  $element: document.createElement('ul')
})
console.log(document.body.outerHTML) // => <body><ul></ul></body>

// lists of primitives
hb(document.body, {
  ul: {
    $list: {
      items: [
        'foo',
        'bar'
      ],
      createElement: function () { // note: createElement must be constructable for compatibility with custom elements
        return document.createElement('li')
      }
    }
  }
})
console.log(document.body.outerHTML) // => <body><ul><li>foo</li><li>bar</li></ul></body>

// lists of objects
hb(document.body, {
  ul: {
    $list: {
      key: 'id',
      items: [
        { id: 0, data: 'foo' },
        { id: 1, data: 'bar' }
      ],
      createElement: function (item, i) {
        var li = document.createElement('li')
        li.textContent = `item #${i}: ${item.data}`
        return li
      }
    }
  }
})
console.log(document.body.outerHTML) // => <body><ul><li>item #0: foo</li><li>item #1: bar</li></ul></body>

// lists of objects (using custom-elements)
document.body.innerHTML = ''
class Row extends HTMLElement {
  constructor (item, i) {
    super()
    this.textContent = item.data
  }
}
customElements.define('x-row', Row)
hb(document.body, {
  $list: {
    key: 'id',
    items: [
      { id: 0, data: 'foo' },
      { id: 1, data: 'bar' }
    ],
    createElement: Row
  }
})
console.log(document.body.outerHTML) // => <body><x-row>foo</x-row><x-row>bar</x-row></body>
