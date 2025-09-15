import { dynamodb } from "./aws-config";
import type { GetCommandInput, PutCommandInput, ScanCommandInput, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import type { WatchData } from "./types/WatchData"

// Generic service response type
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const fetchData = async (): Promise<ServiceResponse<WatchData[]>> =>
{
    const params: ScanCommandInput = {
        TableName: "WatchListShows",
    }

    try {
        const data = await dynamodb.scan(params);
        return { success: true, data: (data.Items as WatchData[]) };
    } catch(error: any)
    {
        return {success: false, message: error.message};
    }
}

export const fetchDataById = async (id: string) : Promise<ServiceResponse<WatchData>> =>
{    
    const params : GetCommandInput = {
        TableName: "WatchListShows",
        Key: {
            showId: id.toString(),
        },
    }

    try {
        const data = await dynamodb.get(params);
        return { success: true, data: data.Item as WatchData };
    } catch(error : any)
    {
        return {success: false, message: error.message};
    }
}
export const removeDataById = async (id: string) =>
{    
    const params : DeleteCommandInput = {
        TableName: "WatchListShows",
        Key: {
            showId: id.toString(),
        },
    }

    try {
        await dynamodb.delete(params);
        console.log('Success removing data:', params);
        return { success: true };
    } catch(error : any)
    {
        console.error('Error removing data:', error);
        return {success: false, message: error.message};
    }
}

export const uploadData = async (data : WatchData) => {
  const params : PutCommandInput = {
    TableName: 'WatchListShows',
    Item: data,
  };

  try {
    await dynamodb.put(params);
    console.log('Uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading:', data);
    throw error;
  }
}