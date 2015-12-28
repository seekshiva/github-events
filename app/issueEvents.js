import { h } from '@cycle/dom'
import showIssueCommentEvent from './issueComments.js'

export default function issueEvents({ eventsStream : issuesStream }){
  return {
    DOM: issuesStream.map(issues => h('div', [
      h('h1', issues.length === 0 && 'Loading...'),
      h('ul', issues.map(showIssueCommentEvent))
    ]))
  }
}
