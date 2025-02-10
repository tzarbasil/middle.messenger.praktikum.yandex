class HttpRequest {
  private request(
    method: string,
    url: string,
    body: any = null,
    params: Record<string, string> = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const fullUrl = method === 'GET' && Object.keys(params).length
        ? `${url}?${new URLSearchParams(params).toString()}`
        : url;

      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl, true);

      if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            console.error('Response parsing error:', e);
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));

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
