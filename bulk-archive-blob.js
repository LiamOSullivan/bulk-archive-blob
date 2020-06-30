'use strict'

const { BlobServiceClient } = require('@azure/storage-blob')
const uuidv1 = require('uuid/v1')

async function main () {
  let d = new Date()
  console.log('Bulk archive service started ' + d)

  d = new Date()
  console.log('Bulk archive service stopped ' + d)
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message))
