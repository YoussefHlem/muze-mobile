// // Libraries
// import { BlobServiceClient } from "@azure/storage-blob";

// // container name
// const containerName = "usercontainer";

// const blobServiceClient = new BlobServiceClient(
//   `https://muzefirststorage.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-11-13T05:40:58Z&st=2024-03-25T21:40:58Z&spr=https&sig=ALjuFtRB1aXvARdpTxPYyjuvDF7BnH3IrafwI3lJMvY%3D`
// );
// // BlobUrl to access assets from
// export const ContainerURL = `https://muzefirststorage.blob.core.windows.net/${containerName}/Front-End%20Assets/`;
// export const IconsBlobUrl = `${ContainerURL}icons/`;

// export const uploadBlob = async (file, folderName) => {
//   // getting the containerBlob
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   // creating random blob name

//   const blobName =
//     `${folderName}/` + `${folderName}-` + new Date().getTime().toString();

//   // creating and getting the blob
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   // converting the file from datauri to blob
//   const blob = await (await fetch(file)).blob();
//   await blockBlobClient.uploadData(blob);

//   return {
//     blobName,
//     blobUrl: `https://muzefirststorage.blob.core.windows.net/${containerName}/${blobName}`,
//   };
// };
// export const deleteBlob = async (blobName) => {
//   // include: Delete the base blob and all of its snapshots.
//   // only: Delete only the blob's snapshots and not the blob itself.
//   const options = {
//     deleteSnapshots: "include",
//   };
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   // Create blob client from container client
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   await blockBlobClient.deleteIfExists(options);
// };

// export const DefaultImage = `./icons/common/user.jpg`;
