import { StaticMiddleware } from './static.middleware';

describe('StaticMiddleware', () => {
  it('should be defined', () => {
    expect(new StaticMiddleware()).toBeDefined();
  });
});
