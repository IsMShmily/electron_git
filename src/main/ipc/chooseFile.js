import { dialog, ipcMain } from 'electron'
import { mainWindow } from '../index'

const chooseFolder = async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  if (result.filePaths.length > 0) {
    return result.filePaths[0]
  }
}

const setupChooseFileIPC = () => {
  ipcMain.handle('chooseFolder', () => {
    return chooseFolder()
  })
}

export default setupChooseFileIPC
