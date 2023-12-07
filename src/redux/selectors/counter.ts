import { RootState } from '@/redux/hooks'

//Hover Param to see all state in store
//Handle store data before use
const selectCount = (state: RootState) => state.counter.value

export { selectCount }
