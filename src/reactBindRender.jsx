import React from 'react'

function ReactBindRender(MonitorINS) {
  this.MonitorINS = MonitorINS
}

ReactBindRender.prototype.withBindRender = withBindRender
ReactBindRender.prototype.useBindRender = useBindRender

function withBindRender(Component, dependent) {
  const INS = this
  return function App(props) {
    const [, setUpdateRender] = React.useState(0)
    const monitorRef = React.useRef()
    if (!monitorRef.current) {
      monitorRef.current = INS.MonitorINS.register(d => { setUpdateRender(pre => pre + 1) }, dependent)
    }
    React.useEffect(() => {
      return () => { monitorRef.current() }
    }, [])
    return <Component {...props} />
  }
}

function useBindRender(dependent) {
  const [updateRender, setUpdateRender] = React.useState(0)
  const monitorRef = React.useRef()
  if (!monitorRef.current) {
    monitorRef.current = this.MonitorINS.register(d => { setUpdateRender(pre => pre + 1) }, dependent)
  }
  React.useEffect(() => {
    return () => { monitorRef.current() }
  }, [])
  return updateRender
}

export default ReactBindRender