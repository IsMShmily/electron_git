import localforage from 'localforage'

const gitStore = localforage.createInstance({
  name: 'GitStore'
})

export default gitStore
