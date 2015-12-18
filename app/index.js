import Rx from 'rx'
import Cycle from '@cycle/core'
import CycleDOM, { h } from '@cycle/dom'
import repoEvents from './repoEvents.js'


function main(drivers) {
  const eventTypeStream = drivers.DOM.select('select')
    .events('change')
    .map(ev => ev.target.value)
    .startWith('issues')

  const repoEventsStream = repoEvents()

  return {
    DOM: Rx.Observable.just(0).map(() =>
      h('div', [
        h('h1', 'GitHub Events'),
        h('select', [
          h('option', { value: 'all'}, 'All Events'),
          h('option', { value: 'issues', selected: true}, 'Issues')
        ]),
        eventTypeStream.map(eventType =>
          eventType === 'issues'
          ? h('h1', 'Issues has not been implemented yet. Coming soon..')
          : repoEventsStream.DOM
        )
      ])
    )
  }
}

const drivers = {
  DOM: CycleDOM.makeDOMDriver('#app')
}

Cycle.run(main, drivers)
