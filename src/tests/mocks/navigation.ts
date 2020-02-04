export const mockNavigation = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn().mockReturnValue(''),
  setParams: jest.fn(),
} as any
