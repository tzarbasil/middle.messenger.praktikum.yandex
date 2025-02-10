class HttpRequest {
  private request(method: string, url: string, body: any = null, params: Record<string, string> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (method === 'GET' && Object.keys(params).length) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      if (method === 'POST' || method === 'PUT') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error'));
      };

      if (body) {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  public get(url: string, params: Record<string, string> = {}): Promise<any> {
    return this.request('GET', url, null, params);
  }

  public post(url: string, body: any): Promise<any> {
    return this.request('POST', url, body);
  }

  public put(url: string, body: any): Promise<any> {
    return this.request('PUT', url, body);
  }

  public delete(url: string, body: any): Promise<any> {
    return this.request('DELETE', url, body);
  }
}

export { HttpRequest };
