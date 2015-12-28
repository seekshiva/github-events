import Rx from 'rx'
import { h } from '@cycle/dom'
import repoEvents from './repoEvents.js'
import issueEvents from './issueEvents.js'

export default function eventStreamFetcher(eventTypeStream, repoStream){
  const reqUrlStream = Rx.Observable
    .combineLatest(eventTypeStream, repoStream)
    .map(([eventType, repoPath]) => {
      const suffix = eventType === 'issues'
        ? '/issues/comments?sort=created&direction=desc'
        : '/events'

      return 'https://api.github.com/repos/' + repoPath + suffix
    })
  const responseStream = reqUrlStream.flatMapLatest(url => fetch(url))

  const eventsStream = responseStream
    .flatMap(response => response.json())
    .startWith([])
  const repoEventsStream = repoEvents({ eventsStream })
  const issueEventsStream = issueEvents({ eventsStream })

  return eventTypeStream.map((eventType) => {
    return {
      DOM: h('div', [
        h('div', eventType),
        eventType === 'all'
        ? h('div', repoEventsStream.DOM)
        : h('div', issueEventsStream.DOM)
      ])
    }
  })
}
