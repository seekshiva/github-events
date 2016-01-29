import Rx from 'rx'
import { h } from '@cycle/dom'
import helper from 'hyperscript-helpers'

const { select, option } = helper(h)

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
      select('#repo', repoList.map(repo =>
          option({
            selected: repo === defaultRepo
          }, repo)
        )
      )
    )
  }
}
