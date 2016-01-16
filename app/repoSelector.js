import Rx from 'rx'
import { h } from '@cycle/dom'

export default function repoSelector() {
  const defaultRepo = 'facebook/react'
  const repoListStream = Rx.Observable.just([
    'facebook/react',
    'cyclejs/cycle-core',
    'cyclejs/cycle-dom',
    'seekshiva/courses'
  ])
  return {
    DOM: repoListStream.map(repoList =>
      h(
        'select',
        { id: 'repo'},
        repoList.map(repo =>
          h('option', {
            selected: repo === defaultRepo
          }, repo)
        )
      )
    )
  }
}
