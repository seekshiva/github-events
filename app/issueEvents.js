import Rx from 'rx'
import { h } from '@cycle/dom'
import showEvent from './showEvent.js'

export default function issueEvents(){
  const reqUrlStream = Rx.Observable
    .just('https://api.github.com/repos/facebook/react/events')

  const responseStream = reqUrlStream.flatMap(url => fetch(url))

  const issuesStream = responseStream
    .flatMap(response => response.json())
    .startWith([])

  return {
    DOM: issuesStream.map(issues => h('div', [
      h('h1', issues.length === 0 && 'Loading...'),
      h('ul', issues.map(showEvent))
    ]))
  }
}
