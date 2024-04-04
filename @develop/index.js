import React from 'react'
import ReactDOM from 'react-dom'

import Imitation from '../src/imitation'
const ImitationINS = new Imitation()
ImitationINS.state = { name: 'jack', address: 'japan' }

function Name() {
  console.log('render Name')
  return <input onChange={e => ImitationINS.assignState({ name: e.target.value })} value={ImitationINS.state.name} />
}
function dependentA(state) {
  console.log(state)
  return state.name
}
const NameS = ImitationINS.withBindComponent(Name, dependentA)


function Address() {
  console.log('render Address')
  const onChange = (e) => {
    ImitationINS.state.address = e.target.value
    ImitationINS.dispatch()
  }
  return <input onChange={onChange} value={ImitationINS.state.address} />
}
const AddressS = ImitationINS.withBindComponent(Address, state => [state.address])


function AddressShow() {
  console.log('render AddressShow')
  return ImitationINS.state.address
}
const AddressShowS = ImitationINS.withBindComponent(AddressShow, state => [state.address])


function App() {
  console.log('render App')
  return <div>
    <NameS />
    <AddressS />
    <AddressShowS />
  </div>
}


ReactDOM.render(<App />, document.getElementById('root'))

ImitationINS.register(() => { console.log(ImitationINS.state.address) }, state => [state.address])