import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axiosClient';

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

  getUsers: ({ sort, order, search, take }: ReqSearch) => {
    return axiosClient.get<ResGetUsers>('/api/users/all', {
      params: { sort, order, search, take },
    });
  },
  createItem: (req: ReqItem) => {
    return axiosClient.post<ResItem>('/api/item/create', req);
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
};
