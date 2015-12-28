import Cycle from '@cycle/core'
import CycleDOM, { h } from '@cycle/dom'
import eventStreamFetcher from './eventStreamFetcher.js'

function main(drivers) {
  const eventTypeStream = drivers.DOM.select('select#eventTYpe')
    .events('change')
    .map(ev => ev.target.value)
    .startWith('issues')

  const repoStream = drivers.DOM.select('select#repo')
    .events('change')
    .map(ev => ev.target.value)
    .startWith('facebook/react')

  const eventsStream = eventStreamFetcher(eventTypeStream, repoStream)


  return {
    DOM: eventsStream.map(eventListing => {
      return h('div', [
        h('h1', 'GitHub Events'),
        h('select', { id: 'eventTYpe'}, [
          h('option', { value: 'all'}, 'All Events'),
          h('option', { value: 'issues', selected: true}, 'Issues')
        ]),
        h('select', { id: 'repo'}, [
          h('option', { value: 'facebook/react', selected: true}, 'facebook/react'),
          h('option', { value: 'cyclejs/cycle-core'}, 'cyclejs/cycle-core'),
          h('option', { value: 'cyclejs/cycle-dom'}, 'cyclejs/cycle-dom')
        ]),
        eventListing.DOM
      ])
    })
  }
}

const drivers = {
  DOM: CycleDOM.makeDOMDriver('#app')
}

Cycle.run(main, drivers)
