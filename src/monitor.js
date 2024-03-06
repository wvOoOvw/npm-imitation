const _Allow = Symbol('_Allow')

const differentArray = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return true
  return a.filter((i, index) => i === b[index]).length !== a.length
}

function Monitor(ImitationI) {
  this.ImitationI = ImitationI
  this.dependentQueue = []
  this.monitorQueue = []
}

Monitor.prototype.dispatch = dispatch
Monitor.prototype.register = register
Monitor.prototype.executeEvent = executeEvent
Monitor.prototype.executeDependent = executeDependent

function dispatch() {
  this.monitorQueue.forEach((i, index) => {
    const dependentPrevious = this.dependentQueue[index]
    const dependentCurrent = this.executeDependent(i.dependent)

    if (dependentCurrent === _Allow) {
      this.executeEvent(i.event)
      this.dependentQueue[index] = dependentCurrent
      return
    }

    if (Array.isArray(dependentCurrent) && Array.isArray(dependentPrevious) && differentArray(dependentCurrent, dependentPrevious)) {
      this.executeEvent(i.event)
      this.dependentQueue[index] = dependentCurrent
      return
    }

    if (!Array.isArray(dependentCurrent) && !Array.isArray(dependentPrevious) && dependentCurrent !== dependentPrevious) {
      this.executeEvent(i.event)
      this.dependentQueue[index] = dependentCurrent
      return
    }

    this.dependentQueue[index] = dependentCurrent
  })
}

function register(event, dependent = _Allow) {
  const monitor = { event, dependent }
  this.monitorQueue.push(monitor)
  this.dependentQueue.push(this.executeDependent(dependent))

  return () => {
    this.monitorQueue.forEach((i, index) => {
      if (i === monitor) {
        this.monitorQueue = this.monitorQueue.filter((i, index_) => index_ !== index)
        this.dependentQueue = this.dependentQueue.filter((i, index_) => index_ !== index)
      }
    })
  }
}

function executeEvent(event) {
  event(this.ImitationI.state)
}

function executeDependent(dependent) {
  return typeof dependent === 'function' ? dependent(this.ImitationI.state) : dependent
}

export default Monitor