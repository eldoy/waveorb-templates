/** Upload actions */
module.exports = {
  createUpload: {
    main: async function($) {
      // Jimp options
      const config = {
        resize: [120, 120]
      }

      // Convert files
      await $.app.file.convert($.files, config)

      // Upload files to CDN and return urls
      return await $.app.file.upload($.files)
    }
  }
}
