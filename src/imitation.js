import Monitor from './monitor'
import ReactBindComponent from './ReactBindComponent'

function Imitation(v) {
  this.state = v
  this.MonitorI = new Monitor(this)
  this.ReactBindComponentI = new ReactBindComponent(this.MonitorI)
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
  return this.MonitorI.register(...arguments)
}
function dispatch() {
  return this.MonitorI.dispatch(...arguments)
}
function withBindComponent() {
  return this.ReactBindRenderI.withBindComponent(...arguments)
}
function useBindComponent() {
  return this.ReactBindRenderI.useBindComponent(...arguments)
}

export default Imitation