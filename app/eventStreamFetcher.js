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
  const responseStream = reqUrlStream
    .flatMapLatest(url => fetch(url))

  const baseEventsStream = responseStream
    .flatMap(response => response.json())
    .shareReplay(1)

  const eventsStream = baseEventsStream.startWith([])

  const lastFetchedEventStream = eventsStream
    .withLatestFrom(eventTypeStream)
    .map(([, eventType]) => eventType)
    .shareReplay(1)

  const repoEventsStream = repoEvents({ eventsStream })
  const issueEventsStream = issueEvents({ eventsStream })
  lastFetchedEventStream.subscribe(() => {})

  const loadingStatusStream = reqUrlStream.map(() => 1)
    .merge(baseEventsStream.map(() => 0))

  return loadingStatusStream
    .combineLatest(lastFetchedEventStream)
    .map(([isLoading, latestEventType]) => {
      return {
        DOM: h('div', [
          h('div', {
            innerHTML: isLoading ? 'Loading...' : '&nbsp;'
          }),
          latestEventType === 'all'
          ? h('div', repoEventsStream.DOM)
          : h('div', issueEventsStream.DOM)
        ])
      }
    })
}
