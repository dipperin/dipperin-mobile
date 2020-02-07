export const mockNavigation = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn().mockReturnValue(''),
  addListener: jest.fn(),
  setParams: jest.fn(),
} as any
