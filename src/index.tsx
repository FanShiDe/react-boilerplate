// import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'src/containers/App'

// const HotApp = hot(App)

const MOUNT_NODE = document.getElementById('root')
const render = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    MOUNT_NODE,
  )
render()

// // @ts-ignore
// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   // @ts-ignore
//   module.hot.accept(['./containers/App'], () => {
//     if (MOUNT_NODE) {
//       ReactDOM.unmountComponentAtNode(MOUNT_NODE)
//       render()
//     }
//   });
// }
