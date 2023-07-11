import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axiosClient';
import { ReqUploadFiles, ResUploadFiles } from '@/shared/types/uploadType';

import {
  ReqLogin,
  ReqRefresh,
  ReqRegister,
  ResLogin,
  ResRefreshToken,
  ResRegister,
} from '../shared/types/authType';
import {
  ReqCategories,
  ResCategories,
  ResCategory,
} from '../shared/types/categoryType';
import { ReqItem, ReqSearch, ResItem } from '../shared/types/itemType';
import { ResGetRoles, ResGetUsers } from '../shared/types/rolesType';

export const CmsApi = {
  login: async (req: ReqLogin) => {
    return (
      await axiosClient.post<AxiosResponse<ResLogin>>('/api/auth/login', req)
    ).data;
  },

  register: (req: ReqRegister) => {
    return axiosClient.post<ResRegister>('/api/auth/register', req);
  },

  refreshToken: async (req: ReqRefresh) => {
    return (
      await axiosClient.post<AxiosResponse<ResRefreshToken>>(
        '/api/auth/refresh-token',
        req
      )
    ).data;
  },

  getRoles: () => {
    return axiosClient.get<ResGetRoles>('/api/auth/roles');
  },

  getUsers: ({ sort, search, take, order }: ReqSearch) => {
    return axiosClient.get<ResGetUsers>('/api/users/all', {
      params: { sort, search, take, order },
    });
  },
  createItem: (req: ReqItem) => {
    return axiosClient.post<ResItem>('/api/item/create', req);
  },

  deleteItem: (id: string) => {
    return axiosClient.delete<ResItem>(`/api/item/${id}`);
  },

  createCategory: (req: ReqCategories) => {
    return axiosClient.post<ResCategories>(
      '/api/cat/create-parent-category',
      req
    );
  },

  getCategory: () => {
    return axiosClient.get<ResCategory>('/api/cat');
  },

  getListItems: ({ sort, page, take }: ReqSearch) => {
    return axiosClient.get<ResItem>('/api/item/search', {
      params: { sort, page, take },
    });
  },

  uploadFiles: (props: ReqUploadFiles) => {
    const formData = new FormData();
    props.files.forEach((file) => {
      formData.append('files', file);
    });
    return axiosClient.post<ResUploadFiles>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
