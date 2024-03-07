import React from 'react'

function ReactBindComponent(MonitorI) {
  this.MonitorI = MonitorI
}

ReactBindComponent.prototype.withBindComponent = withBindComponent
ReactBindComponent.prototype.useBindComponent = useBindComponent
ReactBindComponent.prototype.withBindComponentPure = withBindComponentPure
ReactBindComponent.prototype.useBindComponentPure = useBindComponentPure

function withBindComponent(Component, dependent) {
  const Instance = this

  return function App(props) {
    const [update, setUpdate] = React.useState(0)
    const destory = React.useMemo(() => Instance.MonitorInstance.register(state => { setUpdate(pre => pre + 1) }, dependent), [])
    React.useEffect(() => () => destory(), [])
    return <Component {...props} />
  }
}

function useBindComponent(dependent) {
  const [update, setUpdate] = React.useState(0)
  const destory = React.useMemo(() => Instance.MonitorInstance.register(state => { setUpdate(pre => pre + 1) }, dependent), [])
  React.useEffect(() => () => destory(), [])
}

function withBindComponentPure(Component, ImitationMap) {
  return function App(props) {
    const [update, setUpdate] = React.useState(0)
    const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.instance.register(state => { setUpdate(pre => pre + 1) }, i.dependent)], []), [ImitationMap])
    React.useEffect(() => () => destory(), [ImitationMap])
    return <Component {...props} />
  }
}

function useBindComponentPure(ImitationMap) {
  const [update, setUpdate] = React.useState(0)
  const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.instance.register(state => { setUpdate(pre => pre + 1) }, i.dependent)], []), [ImitationMap])
  React.useEffect(() => () => destory(), [ImitationMap])
}

export default ReactBindComponent