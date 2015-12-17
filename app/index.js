import Rx from 'rx'
import Cycle from '@cycle/core'
import CycleDOM, { h } from '@cycle/dom'

function main() {
  const reqUrlStream = Rx.Observable
    .just('https://api.github.com/repos/facebook/react/events')

  const responseStream = reqUrlStream.flatMap(url => fetch(url))
  const eventsStream = responseStream.flatMap(response => response.json())
    .startWith([])

  return {
    DOM: eventsStream.map(events => h(
      'div', [
        h('h1',
          events.length === 0
          ? 'Loading...'
          : '' + events.length + ' events'
        ),
        h('ul', events.map(event => {
          console.log(event);
          return h('li', event.type)
        }))
      ]
    ))
  }
}

const drivers = {
  DOM: CycleDOM.makeDOMDriver('#app')
}

Cycle.run(main, drivers)
