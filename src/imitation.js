import Monitor from './monitor'
import ReactBindRender from './reactBindRender'

function Imitation(v) {
  this.state = v
  this.MonitorINS = new Monitor(this)
  this.ReactBindRenderINS = new ReactBindRender(this.MonitorINS)
}

Imitation.prototype.setState = setState
Imitation.prototype.assignState = assignState
Imitation.prototype.register = register
Imitation.prototype.dispatch = dispatch
Imitation.prototype.withBindRender = withBindRender
Imitation.prototype.useBindRender = useBindRender

function setState(v) {
  this.state = typeof v === 'function' ? v(this.state) : v
  this.dispatch()
}

function assignState(v) {
  this.state = Object.assign(this.state, typeof v === 'function' ? v(this.state) : v)
  this.dispatch()
}

function register() {
  return this.MonitorINS.register(...arguments)
}
function dispatch() {
  return this.MonitorINS.dispatch(...arguments)
}
function withBindRender() {
  return this.ReactBindRenderINS.withBindRender(...arguments)
}
function useBindRender() {
  return this.ReactBindRenderINS.useBindRender(...arguments)
}

export default Imitation