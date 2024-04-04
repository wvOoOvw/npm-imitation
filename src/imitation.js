import Monitor from './monitor'
import ReactBindComponent from './React.BindComponent'

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

function register(...props) {
  return this.MonitorInstance.register(...props)
}
function dispatch(...props) {
  return this.MonitorInstance.dispatch(...props)
}
function withBindComponent(...props) {
  return this.ReactBindComponentInstance.withBindComponent(...props)
}
function useBindComponent(...props) {
  return this.ReactBindComponentInstance.useBindComponent(...props)
}

export default Imitation