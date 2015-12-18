import { h } from '@cycle/dom'
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
})

function watchEvent(event){
  const { actor, payload : { action } } = event

  return h('div', [
    h('a', { href: actor.url }, actor.login),
    //TODO started or stopped?
    ' ' + action + ' watching.'
  ])
}

function forkEvent(event){
  const { actor } = event

  return h('div', [
    h('a', { href: actor.url }, actor.login),
    //TODO started or stopped?
    ' created a fork.'
  ])
}

function pushEvent(event){
  const { actor, payload : { commits } } = event
  console.log(event);

  return h('div', [
    h('a', { href: actor.url }, actor.login),
    //TODO started or stopped?
    ' pushed ' + commits.length + ' commits:',
    h('ul',
      commits.map(commit =>
        h('li', [
          commit.message + ' - ',
          h('a', { href: commit.author.email }, commit.author.name)
        ])
      )
    )
  ])
}

function gollumEvent(event){
  const { actor, payload : { pages } } = event
  return h('div', [
    h('a', { href: actor.url }, actor.login),
    ' has updated the wiki:',
    h('ul', [
      pages.map(page =>
        h('li', [
          page.action + ' ',
          h('a', { href: page.html_url }, page.title)
        ])
      )
    ])
  ])
}

function pullRequestEvent(event){
  const { actor, payload } = event
  const { pull_request : PR } = payload

  return h('div', [
    h('div', [
      h('h3', [
        h('a', { href: PR.html_url }, '#' + PR.number),
        ' - ' + PR.title
      ])
    ]),
    h('a', { href: actor.url }, actor.login),
    ' ' + payload.action + ' a pull request ',
    h('br'), h('br')
  ])
}

function issueCommentEvent(event){
  const { actor, payload } = event
  const { comment, issue } = payload
  // console.log(comment);

  if (payload.action !== 'created') {
    return ('h1', 'Unknown issue comment event: ' + payload.action)
  }


  // console.log(marked(comment.body));

  return h('div', [
    h('div', [
      h('h3', [
        h('a', { href: issue.html_url }, '#' + issue.number),
        ' - ' + issue.title
      ])
    ]),
    h('a', { href: actor.url }, actor.login),
    ' commented on an issue.',
    h('br'), h('br'),
    h('div', {innerHTML: marked(comment.body)}),
    h('br')
  ])
}

function dummyEvent(event){
  return h('span', event.type)
}

export default function showEvent(event) {
  let eventHandler

  switch (event.type) {
  case 'WatchEvent':
    eventHandler = watchEvent
    break
  case 'ForkEvent':
    eventHandler = forkEvent
    break
  case 'PushEvent':
    eventHandler = pushEvent
    break
  case 'PullRequestEvent':
    eventHandler = pullRequestEvent
    break
  case 'IssueCommentEvent':
    eventHandler = issueCommentEvent
    break
  case 'GollumEvent':
    eventHandler = gollumEvent
    break
  default:
    eventHandler = dummyEvent
  }
  return h('li', eventHandler(event))
}
