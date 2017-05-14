const archiver = require('archiver')
const toArray = require('stream-to-array')

function createArchiver () {
  const archive = archiver('zip', { store: true })

  archive.on('error', (err) => {
    throw err
  })

  archive.toBuffer = function () {
    return toArray(archive)
      .then((parts) => {
        let buffers = []
        for (let i = 0, l = parts.length; i < l; ++i) {
          let part = parts[i]
          buffers.push((part instanceof Buffer) ? part : Buffer.from(part))
        }
        return Buffer.concat(buffers)
      })
  }

  return archive
}

module.exports = createArchiver
