import { VideoTimePipe } from './videotime.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new VideoTimePipe();
    expect(pipe).toBeTruthy();
  });
});
