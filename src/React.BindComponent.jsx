import React from 'react'

function ReactBindComponent(MonitorInstance) {
  this.MonitorInstance = MonitorInstance
}

ReactBindComponent.prototype.withBindComponent = withBindComponent
ReactBindComponent.prototype.useBindComponent = useBindComponent
ReactBindComponent.prototype.withBindComponentPure = withBindComponentPure
ReactBindComponent.prototype.useBindComponentPure = useBindComponentPure

function withBindComponent(Component, dependence) {
  const Instance = this

  return function App(props) {
    const [update, setUpdate] = React.useState(performance.now())
    const destory = React.useMemo(() => Instance.MonitorInstance.register(() => setUpdate(performance.now()), dependence), [])
    React.useEffect(() => () => destory(), [])
    return <Component {...props} />
  }
}

function useBindComponent(dependence) {
  const [update, setUpdate] = React.useState(performance.now())
  const destory = React.useMemo(() => Instance.MonitorInstance.register(() => setUpdate(performance.now()), dependence), [])
  React.useEffect(() => () => destory(), [])
}

function withBindComponentPure(Component, ImitationMap) {
  return function App(props) {
    const [update, setUpdate] = React.useState(performance.now())
    const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.instance.register(() => setUpdate(performance.now()), i.dependence)], []), [ImitationMap])
    React.useEffect(() => () => destory.forEach(i => i()), [ImitationMap])
    return <Component {...props} />
  }
}

function useBindComponentPure(ImitationMap) {
  const [update, setUpdate] = React.useState(performance.now())
  const destory = React.useMemo(() => ImitationMap.reduce((t, i) => [...t, i.instance.register(() => setUpdate(performance.now()), i.dependence)], []), [ImitationMap])
  React.useEffect(() => () => destory.forEach(i => i()), [ImitationMap])
}

export default ReactBindComponent

export { withBindComponentPure, useBindComponentPure }