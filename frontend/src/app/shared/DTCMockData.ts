import { Dtc } from './model/ApiResponse';

export const DTCMockData: Dtc = {
    dataPoint: {
        value: [
            {
                dtcs: [
                    {
                        dtcId: 'P0217', // Engine Coolant Over Temperature Condition
                        ecuId: 'SDG_112',
                        occurrences: null,
                        timestamp: '2020-06-23T07:46:02.952615841Z'
                    },
                    {
                        dtcId: 'P0219', // Engine Overspeed Condition
                        ecuId: 'SDG_112',
                        occurrences: null,
                        timestamp: '2020-06-23T07:46:02.952615841Z'
                    },
                    {
                        dtcId: 'P0298', // Engine Oil Over Temperature
                        ecuId: 'SDG_112',
                        occurrences: null,
                        timestamp: '2020-06-23T07:46:02.952615841Z',
                    }
                ]
            }
        ]
    }
}; 