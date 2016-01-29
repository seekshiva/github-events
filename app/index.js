import Cycle from '@cycle/core'
import CycleDOM, { h } from '@cycle/dom'
import helper from 'hyperscript-helpers'
import eventStreamFetcher from './eventStreamFetcher.js'
import repoSelector from './repoSelector'

const { select, option } = helper(h)

const defaultState = {
  eventType: 'issues',
  repo: 'facebook/react'
}

function main(drivers) {
  const eventTypeStream = drivers.DOM.select('select#eventType')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(defaultState.eventType)

  const repoStream = drivers.DOM.select('select#repo')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(defaultState.repo)

  const eventsStream = eventStreamFetcher(eventTypeStream, repoStream)

  const isSelected = val => (
    defaultState.eventType === val
  )

  return {
    DOM: eventsStream.map(eventListing => {
      return h('div', [
        h('h1', 'GitHub Events'),
        select('#eventType', ['all', 'issues'].map(type => (
          option({
            selected: isSelected(type)
          }, type)
        ))),
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
