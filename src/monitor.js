const _Allow = Symbol('_Allow')

const differentArray = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return true
  return a.filter((i, index) => i === b[index]).length !== a.length
}

function Monitor(ImitationInstance) {
  this.ImitationInstance = ImitationInstance
  this.dependenceQueue = []
  this.monitorQueue = []
}

Monitor.prototype.dispatch = dispatch
Monitor.prototype.register = register
Monitor.prototype.executeEvent = executeEvent
Monitor.prototype.executeDependence = executeDependence

function dispatch() {
  this.monitorQueue.forEach((i, index) => {
    const dependencePrevious = this.dependenceQueue[index]
    const dependenceCurrent = this.executeDependence(i.dependence)

    if (dependenceCurrent === _Allow) {
      this.executeEvent(i.event)
      this.dependenceQueue[index] = dependenceCurrent
      return
    }

    if (Array.isArray(dependenceCurrent) && Array.isArray(dependencePrevious) && differentArray(dependenceCurrent, dependencePrevious)) {
      this.executeEvent(i.event)
      this.dependenceQueue[index] = dependenceCurrent
      return
    }

    if (!Array.isArray(dependenceCurrent) && !Array.isArray(dependencePrevious) && dependenceCurrent !== dependencePrevious) {
      this.executeEvent(i.event)
      this.dependenceQueue[index] = dependenceCurrent
      return
    }

    this.dependenceQueue[index] = dependenceCurrent
  })
}

function register(event, dependence = _Allow) {
  const monitor = { event, dependence }
  this.monitorQueue.push(monitor)
  this.dependenceQueue.push(this.executeDependence(dependence))

  return () => {
    this.monitorQueue.forEach((i, index) => {
      if (i === monitor) {
        this.monitorQueue = this.monitorQueue.filter((i, index_) => index_ !== index)
        this.dependenceQueue = this.dependenceQueue.filter((i, index_) => index_ !== index)
      }
    })
  }
}

function executeEvent(event) {
  event(this.ImitationInstance.state)
}

function executeDependence(dependence) {
  return typeof dependence === 'function' ? dependence(this.ImitationInstance.state) : dependence
}

export default Monitor