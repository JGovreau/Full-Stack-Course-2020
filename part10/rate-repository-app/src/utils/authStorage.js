import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    console.log('Retrieved access token:', token);
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    console.log('Stored access token:', accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    console.log('Removed access token');
  }

}

export default AuthStorage;
