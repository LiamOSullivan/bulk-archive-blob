/**
 * Bulk move data files to Azure blob stroage
 *
 * @param {}
 *
 * @return { null }
 *
 *
 */

'use strict'
const path = require('path')
require('dotenv').config()
const { BlobServiceClient } = require('@azure/storage-blob')
const dateFormatter = require('./modules/date.js')


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
const ROOT_DIR_NAME = process.env.ROOT_DIR_NAME

async function main () {
  let d = new Date()
  console.log('\n***')
  console.log('Bulk archive service started ' + d.toString().split('G')[0])

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

  // List the containerItems (paged)
  console.log('\nListing containers...')
  let i = 1
  for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 5 })) {
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`)
      }
    }
  }

  // Get a reference to the root data container
  const containerClientRoot = blobServiceClient.getContainerClient(ROOT_DIR_NAME)

  // List the blob(s) in the container
  console.log(`\nListing blobs for ${ROOT_DIR_NAME}...`)
  for await (const blob of containerClientRoot.listBlobsFlat()) {
    console.log('\t', blob.name)
  }

// Create a unique name for the blob

const dirName = dateFormatter.formatDateAsYYYYMMDD(d)
console.log('dirName: \t'+dirName);
const blobName = 'test-' + Date.now() + '.txt'
const blobPath = path.join( dirName, blobName)
console.log('blobPath:');
console.log(blobPath);


// Get a block blob client
const blockBlobClient = containerClientRoot.getBlockBlobClient(blobPath);

console.log('\nUploading to Azure storage as blob:\n\t', blobPath);

// Upload data to the blob
const data = 'test'
const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

  d = new Date()
  console.log('\nBulk archive service stopped ' + d.toString().split('G')[0])
  console.log('***\n')
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message))
