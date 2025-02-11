enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

class HttpRequest {
  private queryStringify(params: Record<string, string>): string {
    if (typeof params !== 'object' || params === null) {
      throw new Error('Params must be an object');
    }

    return Object.keys(params).length
      ? `?${Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')}`
      : '';
  }

  private request(
    method: HttpMethod,
    url: string,
    body: any = null,
    params: Record<string, string> = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const fullUrl = method === HttpMethod.GET ? `${url}${this.queryStringify(params)}` : url;

      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl, true);

      if (method !== HttpMethod.GET) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));

      if (method !== HttpMethod.GET && body) {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  public get(url: string, params: Record<string, string> = {}): Promise<any> {
    return this.request(HttpMethod.GET, url, null, params);
  }

  public post(url: string, body: any): Promise<any> {
    return this.request(HttpMethod.POST, url, body);
  }

  public put(url: string, body: any): Promise<any> {
    return this.request(HttpMethod.PUT, url, body);
  }

  public delete(url: string, body: any): Promise<any> {
    return this.request(HttpMethod.DELETE, url, body);
  }
}

export { HttpRequest, HttpMethod };
