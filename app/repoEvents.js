import Rx from 'rx'
import { h } from '@cycle/dom'
import showEvent from './showEvent.js'

export default function repoEvents(){
  const reqUrlStream = Rx.Observable
    .just('https://api.github.com/repos/facebook/react/events')

  const responseStream = reqUrlStream.flatMap(url => fetch(url))

  const eventsStream = responseStream
    .flatMap(response => response.json())
    .startWith([])

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
