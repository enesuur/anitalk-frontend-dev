import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import STATUS_CODES from './statuses';
import config from '@/config';

/**
 * Axios instances configured with baseURL and default headers.
 * @param {string} resource.
 */

export const remoteInstance = axios.create({
  baseURL: `http://${config.REMOTE_HOST}:${config.REMOTE_PORT}/api/${config.API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const baseInstance = axios.create({
  baseURL: `http://${config.BASE_URL}:${config.PORT}/api/${config.API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 
TODO: Network error handler, no connection.

*/

/**
 * Axios retry configuration.
 * Retries on network errors and 5xx server errors.
 */
axiosRetry(baseInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    if (error.response?.data) return false;
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500
    );
  },
});

axiosRetry(remoteInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    if (error.response?.data) return false;
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500
    );
  },
});

/**
 * Intercepts requests to prepend `/api` if missing and log request details.
 */
baseInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

remoteInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

/**
 * Handles errors and returns user-friendly messages based on status code.
 */
baseInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const errorMessage =
      typeof error.response?.data === 'string'
        ? error.response.data
        : STATUS_CODES[error.response?.status ?? 0] || error.message || 'Unknown error';

    throw new Error(errorMessage);
  },
);

remoteInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const errorMessage =
      typeof error.response?.data === 'string'
        ? error.response.data
        : STATUS_CODES[error.response?.status ?? 0] || error.message || 'Unknown error';

    throw new Error(errorMessage);
  },
);
