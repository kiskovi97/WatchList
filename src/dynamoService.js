import { dynamodb, initAWS } from "./aws-config.js";

export const fetchData = async () =>
{
    await initAWS();

    const params = {
        TableName: "WatchListShows",
    }

    try {
        const data = await dynamodb.scan(params).promise();
        return { success: true, data: data.Items };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}
export const fetchDataById = async (id) =>
{
    await initAWS();
    
    const params = {
        TableName: "WatchListShows",
        Key: {
            showId: id.toString(),
        },
    }

    try {
        const data = await dynamodb.get(params).promise();
        return { success: true, data: data.Item };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}
export const removeDataById = async (id) =>
{
    await initAWS();
    
    const params = {
        TableName: "WatchListShows",
        Key: {
            showId: id.toString(),
        },
    }

    try {
        await dynamodb.delete(params).promise();
        console.log('Success removing data:', params);
        return { success: true };
    } catch(error)
    {
        console.error('Error removing data:', error);
        return {success: false, message: error.message};
    }
}

export const uploadData = async (data) => {
  await initAWS();

  const params = {
    TableName: 'WatchListShows',
    Item: data,
  };
  try {
    await dynamodb.put(params).promise();
    console.log('Uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading:', data);
    throw error;
  }
};