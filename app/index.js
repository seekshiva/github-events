import Cycle from '@cycle/core'
import CycleDOM, { h } from '@cycle/dom'
import eventStreamFetcher from './eventStreamFetcher.js'
import repoSelector from './repoSelector'

const defaultState = {
  eventType: 'issues',
  repo: 'facebook/react'
}

function main(drivers) {
  const eventTypeStream = drivers.DOM.select('select#eventTYpe')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(defaultState.eventType)

  const repoStream = drivers.DOM.select('select#repo')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(defaultState.repo)

  const eventsStream = eventStreamFetcher(eventTypeStream, repoStream)


  return {
    DOM: eventsStream.map(eventListing => {
      return h('div', [
        h('h1', 'GitHub Events'),
        h('select', { id: 'eventTYpe'}, [
          h(
            'option',
            {
              value: 'all',
              selected: defaultState.eventType === 'all'
            },
            'All Events'
          ),
          h(
            'option',
            {
              value: 'issues',
              selected: defaultState.eventType === 'issues'
            },
            'Issues'
          )
        ]),
        repoSelector().DOM,
        eventListing.DOM
      ])
    })
  }
}

const drivers = {
  DOM: CycleDOM.makeDOMDriver('#app')
}

Cycle.run(main, drivers)
