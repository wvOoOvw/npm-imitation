import React from 'react'

function ReactBindComponent(MonitorInstance) {
  this.MonitorInstance = MonitorInstance
}

ReactBindComponent.prototype.withBindComponent = withBindComponent
ReactBindComponent.prototype.useBindComponent = useBindComponent

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

export default ReactBindComponent