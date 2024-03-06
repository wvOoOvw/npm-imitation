import React from 'react'

function withBindComponentPure(Component, ImitationMap) {
  return function App(props) {
    const [update, setUpdate] = React.useState(0)
    const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.I.register(state => { setUpdate(pre => pre + 1) }, i.dependent)], []), [ImitationMap])
    React.useEffect(() => () => destory(), [ImitationMap])
    return <Component {...props} />
  }
}

function useBindComponentPure(ImitationMap) {
  const [update, setUpdate] = React.useState(0)
  const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.I.register(state => { setUpdate(pre => pre + 1) }, i.dependent)], []), [ImitationMap])
  React.useEffect(() => () => destory(), [ImitationMap])
}

export { withBindComponentPure, useBindComponentPure }