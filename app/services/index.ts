import { IApiServices } from "@/app/interfaces/classInterfaces";
import { IAsset } from "../interfaces/contextInterfaces";

export class ApiServices implements IApiServices {
    public url = 'http://ec2-54-91-215-149.compute-1.amazonaws.com/api';
    public credentials = 'psAdmin:goledger';

    async getSchema() {
        try {
            const response = await fetch(`${this.url}/query/getSchema`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
                }
            });

            if (!response.ok) return false;

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async searchAsset(assetType: string) {
        try {
            const response = await fetch(`${this.url}/query/search`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
                    accept: '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: {
                        selector: {
                            '@assetType': assetType,
                        },
                    }
                }),
            });

            if (!response.ok) return false;
            
            const { result } = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async createAsset(payload: IAsset) {
        try {
            const response = await fetch(`${this.url}/invoke/createAsset`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
                    accept: '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset: [
                        {
                            ...payload,
                        },
                    ]
                }),
            });

            if (!response.ok) return false;
            
            const { result } = await response.json();
            return result || true;
        } catch (error) {
            console.error(error);
        }
    }

    async updateAsset(payload: IAsset) {
        try {
            const response = await fetch(`${this.url}/invoke/updateAsset`, {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
                    accept: '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    update: {
                        ...payload,
                    }
                }),
            });

            if (!response.ok) return false;
            
            const { result } = await response.json();
            return result || true;
        } catch (error) {
            return error || false;
        }
    }

    async deleteAsset(payload: { '@assetType': string; id: string; name: string; }) {
        try {
            const response = await fetch(`${this.url}/invoke/deleteAsset`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
                    accept: '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: {
                        ...payload,
                    },
                }),
            });
     
            return response.ok;
        } catch (error) {
            return error || false;
        }
    }
}