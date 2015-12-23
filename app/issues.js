import { h } from '@cycle/dom'
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
})

function subscriptionEvent({ actor, issue }){
  return h('span', [
    h('a', { href: actor.url}, actor.login),
    ' subscribed to ',
    h('a', { href: issue.url}, '#' + issue.number)
  ])
}

function labelingEvent({ actor, event, issue, label }){
  const desc = event === 'labeled' ? 'added label to' : 'removed label from'

  return h('span', [
    h('a', { href: actor.url}, actor.login),
    ' ' + desc + ' ',
    h('a', { href: issue.url}, '#' + issue.number),
    ': ' + label.name
  ])
}

function genericEvent({ actor, event, issue }){
  return h('span', [
    h('a', { href: actor.url}, actor.login),
    ' ' + event + ' ',
    h('a', { href: issue.url}, '#' + issue.number)
  ])
}

function dummyIssueEvent(issue){
  // console.log(issue)
  return h('span', issue.event)
}

export default function showIssueEvent(issue) {
  let eventHandler
  console.log(issue);

  switch (issue.event) {
  case 'subscribed':
    eventHandler = subscriptionEvent; break
  case 'closed':
  case 'reopened':
    eventHandler = genericEvent; break
  case 'labeled':
  case 'unlabeled':
    eventHandler = labelingEvent; break
  default:
    eventHandler = dummyIssueEvent
  }
  return h('li', eventHandler(issue))
}
