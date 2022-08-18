**Imitation**

轻量的 状态管理工具 - React全局状态管理 - 同步数据渲染

---

作为一个工具库，在README中将介绍项目中的使用以及架构原理

---

**目录**

一、使用攻略

二、架构原理

---

**使用攻略**

假设我们有组件A和组件B，他们相隔十万八千里，但是我们有一个功能，是A中的按钮点击后会导致B中的文本改变

我们现在使用Imitation去完成它

    // imitaion.js

    import Imitation from 'imitation-imm'

    const ImitationINS = new Imitation()
    ImitationINS.state = { text: 'old view' }

    export default ImitationINS


    // A.jsx

    import Imitation from '../../../imitaion.js'

    function A() {
      const onClick = () => {
        Imitation.state.text = 'new view'
        Imitation.setState(Imitation.state)
      }

      return <button onClick={onClick}>Button<button/>
    }

    export default A


    // B.jsx

    import Imitation from '../../../imitaion.js'

    function B() {
      return <div>{Imitation.state.text}<div/>
    }

    export default ImitationINS.withBindRender(B)

上面的例子，可以发现A是一个需要用户操作的组件，每次操作后会导致其他组件的数据变动而引发视图变动，B是一个展示组件，依赖于数据而进行展示

Imitation的理念是，将数据统一保存在Imitation中，并向外部提供.state的取数据方式，同时向外部提供.setState的改数据方式，.withBindRender高阶组件能够将需要依赖数据变动视图的组件变为一个观察数据变动而重渲染的组件

当然，在组件A中的onClick事件内部逻辑还有另一种写法，可以达到同样的效果

      const onClick = () => {
        Imitation.assignState({ text: 'view' })
      }

当然，在组件B中的export default ImitationINS.withBindRender(B)也有更好的控制方式，就如下面的代码，通过第二参数返回的数组来控制组件何时需要渲染，这次表示只有当Imitation.state.text有变化时才会触发重新执行组件，即重新渲染组件

      export default ImitationINS.withBindRender(B, state => [state.text])

本章介绍到此为止

可以clone代码到本地，执行npm i && npm run start，在目录@develop中进行更多的体验

---

**架构原理**

核心设计模式是：发布订阅模式

类似redux原理，需要进行数据视图更新的组件内部订阅一个由Imitation提供的事件，从而在每次操作类型的组件执行Imitation提供的发布事件后，能够及时的订阅到这个@At，并更新数据视图

还是以这个例子为原型

    // imitaion.js

    import Imitation from 'imitation-imm'

    const ImitationINS = new Imitation()
    ImitationINS.state = { text: 'old view' }

    export default ImitationINS


    // A.jsx

    import Imitation from '../../../imitaion.js'

    function A() {
      const onClick = () => {
        Imitation.state.text = 'new view'
        Imitation.setState(Imitation.state)
      }

      return <button onClick={onClick}>Button<button/>
    }

    export default A


    // B.jsx

    import Imitation from '../../../imitaion.js'

    function B() {
      return <div>{Imitation.state.text}<div/>
    }

    export default ImitationINS.withBindRender(B)

我们可以看到这是最终的使用版

接下来我们简化它，让它变得更易懂

    // imitaion.js

    const Imitation = {
      state: { text: 'old view' },
      setState: (state) => {
        Imitation.state = state
        Imitation.event.forEach(i => i())
      },
      event: []
    }

    export default Imitation

    // A.jsx

    import Imitation from '../../../imitaion.js'

    function A() {
      const onClick = () => {
        Imitation.state.text = 'new view'
        Imitation.setState(Imitation.state)
      }

      return <button onClick={onClick}>Button<button/>
    }

    export default A


    // B.jsx

    import Imitation from '../../../imitaion.js'

    function B() {
      const [update, setUpdate] = React.useState(0)

      React.useEffect(() => {
        Imitation.event.push(() => setUpdate(pre => pre + 1))
      },[])

      return <div>{Imitation.state.text}<div/>
    }

    export default B

相信通过上面简化版的代码，可以很好的发现其中的原理

即在Imitation中存在state, setState, event三个属性，在B组件中将自己的更新函数放入event中，在A组件中触发setState，从而会连携触发event，最终导致了B的重新渲染，此时B中的Imitation.state已经是最新的修改，所以及时更新了视图

更多的细节可以查阅代码......