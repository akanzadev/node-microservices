import { useState } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';

interface Props {
  url: string;
  method: Method;
  body?: {};
  onSuccess?: (data: any) => void;
}
interface Error {
  message: string;
}

export const useRequest = ({ url, method, body }: Props) => {
  const [errors, setErrors] = useState<any>();

  const doRequest = async () => {
    try {
      // set config up to have dinamyc hook use of url, method and boyd
      let config: AxiosRequestConfig = {
        url: url,
        method: method,
        data: body,
      };
      const response = await axios.request(config);
      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oppos</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err: Error) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
