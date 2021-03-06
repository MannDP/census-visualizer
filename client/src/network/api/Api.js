import axios from 'axios'
import { UserStore } from '../../stores/UserStore'

export const baseUrl = 'http://census-viz.herokuapp.com/'

export class Api {
  static createRequest = (
    endpoint,
    requestType,
    payload
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.request({
          url: `${baseUrl}${endpoint}`,
          method: requestType,
          headers: {
            Authorization:
              (UserStore.authToken && `Bearer ${UserStore.authToken}`) || '',
            'Content-Type': 'application/json',
          },
          data: payload === undefined ? undefined : payload,
        })
        resolve(response.data)
      } catch (e) {
        const {
          response: { data },
        } = e
        reject(data)
      }
    })

  static signUpUser = async (payload) => {
    await Api.createRequest('user/register', 'POST', payload)
  }

  static signInUser = async (payload) => {
    const data = await Api.createRequest('user/login', 'POST', payload)
    return data
  }

  static fetchAllQueries = async () => {
    const data = await Api.createRequest('user/saved_queries', 'GET');
    return data;
  }

  static saveQuery = async (payload) => {
    const data = await Api.createRequest('user/save_queries', 'POST', payload);
    return data;
  }

  static deleteQueries = async (payload) => {
    await Api.createRequest('user/delete_queries', 'POST', payload);
  }

  static runQueries = async (payload) => {
    const data = await Api.createRequest('user/query_by_id', 'POST', payload);
    return data;
  }

  static getUserMe = async (payload) => {
    const data = await await Api.createRequest('user/me', 'GET', payload);
    return data;
  }

  static updateDarkMode = async (payload) => {
    const data = await await Api.createRequest('user/dark_mode', 'POST', payload);
    return data;
  }

  static searchFriend = async (payload) => {
    const data = await await Api.createRequest(`user/find_profiles?input=${payload}`, 'GET', payload);
    return data;
  }

  static addFriend = async (payload) => {
    const data = await await Api.createRequest(`user/friends`, 'POST', payload);
    return data;
  }

  static fetchFriends = async () => {
    const data = await Api.createRequest(`user/friends`, 'GET');
    return data;
  }

  static getFriendQueries = async (payload) => {
    const data = await Api.createRequest(`user/friend_queries?username=${payload}`, 'GET', payload);
    return data;
  }

  static shareQueries = async (payload) => {
    const data = await Api.createRequest(`user/share_queries`, 'POST', payload);
    return data;
  }

  static getSharedQueries = async (payload) => {
    const data = await Api.createRequest(`user/shared_queries`, 'GET', payload);
    return data;
  }

  static updateIcon = async (payload) => {
    const data = await await Api.createRequest(`user/icon`, 'POST', payload);
    return data;
  }

  static duplicateQueries = async (payload) => {
    const data = await Api.createRequest(`user/duplicate`, 'POST', payload);
    return data;
  }
}