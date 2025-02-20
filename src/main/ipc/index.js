import log from 'electron-log'
import setupGitIPC from './git'
import setupChooseFileIPC from './chooseFile'

export async function setupIPC() {
  log.info('===============>  ipc start create')

  setupGitIPC()
  setupChooseFileIPC()
}
