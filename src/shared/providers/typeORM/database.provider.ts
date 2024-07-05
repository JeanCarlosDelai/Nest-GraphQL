import { dataSource } from './dataSource';

export const DatabaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    dataSource;
    return dataSource.initialize();
  },
};
