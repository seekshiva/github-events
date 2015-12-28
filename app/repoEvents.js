import { h } from '@cycle/dom'
import showEvent from './showEvent.js'

export default function repoEvents({ eventsStream }){
  return {
    DOM: eventsStream.map(events => h('div', [
      h('h1',
        events.length === 0
        ? 'Loading...'
        : '' + events.length + ' events'
      ),
      h('ul', events.map(showEvent))
    ]))
  }
}
