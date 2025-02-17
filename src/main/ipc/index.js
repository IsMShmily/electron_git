import log from 'electron-log'
import setupGitIPC from './git'

export async function setupIPC() {
  log.info('===============>  ipc start create')

  setupGitIPC()
}
