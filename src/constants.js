export const MONTHS = [
    'default',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const API = {
    UPLOAD: { url: 'api/ftp/upload', method: 'POST' },
    LISTFTPCONN: { url: 'api/ftp/listSavedFTPConnections', method: 'GET' },
    CONNECT: { url: 'api/ftp/connect', method: 'POST' },
    DISCONNECT: { url: 'api/ftp/disconnect', method: 'POST' },
    DOWNLOAD_NEWS: { url: 'api/ftp/download', method: 'GET', timeout: 2 * 60 * 1000 },
    DOWNLOAD_IMAGE: { url: 'api/ftp/download/image', method: 'GET', timeout: 1 * 60 * 1000 },
    DOWNLOAD_IMAGES_DIR: { url: 'api/ftp/download/imagesDir', method: 'GET', timeout: 5 * 60 * 1000 }
}