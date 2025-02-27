import localforage from 'localforage'

const gitStoreLocalforage = localforage.createInstance({
  name: 'GitStore'
})

export default gitStoreLocalforage
