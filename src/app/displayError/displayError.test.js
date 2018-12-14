import displayError from './displayError';
describe('displayError', () => {
  jest.useFakeTimers();
  document.body.innerHTML = `
    <button  class="search-btn">Clear Tasks</button>
    `;
  const body = document.body;
  describe('calling displayError', () => {
    beforeEach(() => {
      displayError('Error!!!');
      displayError('Error!!!2');
    });
    it('should display alert', () => {
      expect(body.firstElementChild.className).toMatch('alert');
    });
    it('it should not display the second alert', () => {
      expect(body.children[1].className).not.toMatch('alert');
    });
    it('should have test "Error!!!"', () => {
      expect(body.firstElementChild.textContent).toMatch('Error!!!');
    });
    it('should remove the alert after 2000 milliseconds', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      jest.advanceTimersByTime(2000);
      expect(body.firstElementChild.className).not.toMatch('alert');
      expect(body.firstElementChild.className).toMatch('search-btn');
    });
  });
  describe('duplication error', () => {
    beforeEach(() => {
      displayError('Error!!!', 'duplication');
      displayError('Error!!!', 'duplication');
    });
    it('should display alert', () => {
      expect(body.firstElementChild.className).toMatch('alert');
    });
    it('it should display the second alert', () => {
      expect(body.children[1].className).toMatch('alert');
    });
  });
});
