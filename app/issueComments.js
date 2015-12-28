import { h } from '@cycle/dom'
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
})

export default function showIssueEvent(issue) {
  const { issue_url, user } = issue
  const issueNumber = (issue_url.split('/').reverse())[0]

  return h('li', [
    h('a', { href: user.url}, user.login),
    ' commented on ',
    h('a', { href: issue.html_url}, '#' + issueNumber),
    h('p', { innerHTML: marked(issue.body) })
  ])
}
