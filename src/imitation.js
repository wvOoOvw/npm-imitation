import Monitor from './monitor'
import ReactBindComponent from './ReactBindComponent'

function Imitation(v) {
  this.state = v
  this.MonitorInstance = new Monitor(this)
  this.ReactBindComponentInstance = new ReactBindComponent(this.MonitorInstance)
}

Imitation.prototype.setState = setState
Imitation.prototype.assignState = assignState
Imitation.prototype.register = register
Imitation.prototype.dispatch = dispatch
Imitation.prototype.withBindComponent = withBindComponent
Imitation.prototype.useBindComponent = useBindComponent

function setState(v) {
  this.state = typeof v === 'function' ? v(this.state) : v
  this.dispatch()
}

function assignState(v) {
  this.state = Object.assign(this.state, typeof v === 'function' ? v(this.state) : v)
  this.dispatch()
}

function register() {
  return this.MonitorInstance.register(...arguments)
}
function dispatch() {
  return this.MonitorInstance.dispatch(...arguments)
}
function withBindComponent() {
  return this.ReactBindRenderInstance.withBindComponent(...arguments)
}
function useBindComponent() {
  return this.ReactBindRenderInstance.useBindComponent(...arguments)
}

export default Imitation