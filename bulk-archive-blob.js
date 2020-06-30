'use strict'
require('dotenv').config()
const { BlobServiceClient } = require('@azure/storage-blob')
// const uuidv1 = require('uuid/v1')

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

async function main () {
  let d = new Date()
  console.log('Bulk archive service started ' + d.toString().split('G')[0])

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient('luas-data')
  console.log('\nListing blobs...')
  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name)
  }

  // Create a unique name for the container
  // const containerName = 'quickstart' + uuidv1();
  // console.log('\nCreating container...');
  // console.log('\t', containerName);
  // Create the container
  // const createContainerResponse = await containerClient.create()
  // console.log('Container was created successfully. requestId: ', createContainerResponse.requestId)

  d = new Date()
  console.log('Bulk archive service stopped ' + d.toString().split('G')[0])
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message))
