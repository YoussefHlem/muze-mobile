import { EAzureBlobStorageFile } from "react-native-azure-blob-storage";

// Container name and connection string
const containerName = "usercontainer";
const connectionString = `https://muzefirststorage.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-01-10T01:26:04Z&st=2023-09-23T16:26:04Z&spr=https&sig=HakHiNPxZacWDNbvWLKuoPtL%2FEGzq5bij%2Boohv7TBIY%3D`;

// Blob URLs for assets
export const ContainerURL = `https://muzefirststorage.blob.core.windows.net/${containerName}/Front-End%20Assets/`;
export const IconsBlobUrl = `${ContainerURL}icons/`;

export const uploadBlob = async (file, folderName) => {
  const azureBlob = new EAzureBlobStorageFile(connectionString);

  try {
    const blobName =
      `${folderName}/` + `${folderName}-` + new Date().getTime().toString();
    const response = await azureBlob.upload_file(blobName, file, containerName);

    return {
      blobName,
      blobUrl: `https://muzefirststorage.blob.core.windows.net/${containerName}/${blobName}`,
    };
  } catch (error) {
    console.error("Error uploading blob:", error);
    throw error;
  }
};

export const deleteBlob = async (blobName) => {
  const azureBlob = new EAzureBlobStorageFile(connectionString);

  try {
    await azureBlob.delete_file(blobName, containerName);
  } catch (error) {
    console.error("Error deleting blob:", error);
    throw error;
  }
};

export const DefaultImage = require("../assets/Images/common/user.jpg"); // Assuming this is a local image
