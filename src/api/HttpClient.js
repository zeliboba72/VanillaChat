class HttpClient {
  constructor() {
    this.baseUrl = 'https://ahj-chat-socket.herokuapp.com/';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.methods = {
      POST: 'POST',
    };
  }

  async post(route, body) {
    const response = await fetch(`${this.baseUrl}${route}`, {
      method: this.methods.POST,
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async login(params) {
    return this.post('login', params);
  }
}

export default new HttpClient();
