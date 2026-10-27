import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import RoutesComponent from '@/app/router'
import { store } from '@/redux/store'
import '@/assets/styles/main.scss'

function App() {
  return <RoutesComponent />
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
