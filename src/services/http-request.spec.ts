import { expect } from 'chai';
import { spy } from 'sinon';
import { HttpTransport } from './HttpRequest.js';

describe('HttpTransport', () => {
  let httpTransport: HttpTransport;

  beforeEach(() => {
    httpTransport = new HttpTransport();
  });

  it('должен вызвать request с GET методом', () => {
    const requestSpy = spy(httpTransport, 'request');
    const url = 'test-get';
    const options = { data: { a: '1' } };

    void httpTransport.get(url, options);

    expect(requestSpy.calledOnce).to.be.true;
    expect(requestSpy.firstCall.args[0]).to.equal('https://ya-praktikum.tech/api/v2/test-get');
    expect(requestSpy.firstCall.args[1]).to.include({ method: 'GET' });
  });

  it('должен вызвать request с POST методом', () => {
    const requestSpy = spy(httpTransport, 'request');
    const url = 'test-post';
    const options = { data: { a: '2' } };

    void httpTransport.post(url, options);

    expect(requestSpy.calledOnce).to.be.true;
    expect(requestSpy.firstCall.args[0]).to.equal('https://ya-praktikum.tech/api/v2/test-post');
    expect(requestSpy.firstCall.args[1]).to.include({ method: 'POST' });
  });

  it('должен вызвать request с PUT методом', () => {
    const requestSpy = spy(httpTransport, 'request');
    const url = 'test-put';
    const options = { data: { a: '3' } };

    void httpTransport.put(url, options);

    expect(requestSpy.calledOnce).to.be.true;
    expect(requestSpy.firstCall.args[0]).to.equal('https://ya-praktikum.tech/api/v2/test-put');
    expect(requestSpy.firstCall.args[1]).to.include({ method: 'PUT' });
  });

  it('должен вызвать request с DELETE методом', () => {
    const requestSpy = spy(httpTransport, 'request');
    const url = 'test-delete';
    const options = { data: { a: '4' } };

    void httpTransport.delete(url, options);

    expect(requestSpy.calledOnce).to.be.true;
    expect(requestSpy.firstCall.args[0]).to.equal('https://ya-praktikum.tech/api/v2/test-delete');
    expect(requestSpy.firstCall.args[1]).to.include({ method: 'DELETE' });
  });

  it('должен выбросить ошибку, если method отсутствует', async () => {
    try {
      await httpTransport.request('/fail', {} as any);
    } catch (err: any) {
      expect(err.message).to.equal('No method');
    }
  });
});
