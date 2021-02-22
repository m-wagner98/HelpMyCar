import {Driver} from '../Driver';
import {ApiResponse} from '../ApiResponse';
import {ChatMessage} from '../ChatMessage';
import {HelpRequest} from '../HelpRequest';
import {ServiceVehicle} from '../../../assistance-operator/model/service-vehicle';

export class TestData {

  public static readonly DRIVER: Driver = {
    vinList: [
      'V1RTUALV1N0000001'
    ],
    user: 'juliaBecker',
    firstName: 'Julia',
    lastName: 'Becker',
    customerNumber: 8976616657,
    entryDate: '2019-05-14',
    residence: 'Mannheim',
    phoneNumber: '+49-155-5551-468',
    email: 'julia.becker@gmail.com'
  };

  public static readonly API_RESPONSE: ApiResponse = {
    version: '1.0',
    deliveredAt: new Date('2020-05-08T08:40:22.828Z'),
    inVehicleData: [
      {
        error: null,
        identifier: {
          value: 'V1RTUALV1N0000001',
          type: 'VIN'
        },
        response: {
          dtc: null,
          geolocation: {
            dataPoint: {
              geoSystem: 'WGS84',
              latitude: 49.00562,
              timestamp: '2020-05-08T08:04:37.867824411Z',
              longitude: 8.37319,
              value: null
            },
            error: null
          },
          checkControlMessages: {
            error: {
              code: '',
              message: ''
            },
            dataPoint: {
              timestamp: '2020-05-21T10:33:33.535539094Z',
              value: [
                {
                  seatingCapacity: 0,
                  status: 'UNKNOWN',
                  message: 'Drive Battery Alert',
                  value: 400,
                  dtcs: [],
                  vehicleSoftware: '',
                  productionDate: '',
                  registrationFirstDate: '',
                  registrationCountry: '',
                  brandName: '',
                  modelName: '',
                  bodyType: '',
                  colorCode: '',
                  colorText: '',
                  vehicleConfiguration: []
                }
              ],
              longitude: 0,
              latitude: 0,
              geoSystem: ''
            }
          },
          basicVehicleData: {
            error: null,
            dataPoint: {
              timestamp: '2020-05-21T11:19:39.762436437Z',
              value: [
                {
                  vehicleSoftware: 'VOS Rev1#c6c2d6ce566c3a6be013fe4ae24a8da636090876',
                  seatingCapacity: 5,
                  productionDate: '2020-01-21',
                  registrationFirstDate: '2020-02-17',
                  registrationCountry: 'DE',
                  brandName: 'VirualOEM',
                  modelName: 'B01',
                  bodyType: 'Sedan',
                  colorText: 'Silver Metallic',
                  colorCode: 'XX01',
                  vehicleConfiguration: [
                    'EC1',
                    'DC21',
                    'OE51'
                  ],
                  value: 0,
                  dtcs: [],
                  message: '',
                  status: ''
                }
              ],
              geoSystem: '',
              latitude: 0,
              longitude: 0
            }
          }
        }
      }
    ]
  };

  public static readonly CHAT_MESSAGES: ChatMessage[] = [{
    sender: 'juliaBecker',
    message: 'Hallo',
    receiver: 'AssistanceOperator'
  }];

  public static readonly helpRequest: HelpRequest[] = [
    {
      driver: TestData.DRIVER,
      apiResponse: TestData.API_RESPONSE,
      status: 'OPEN',
      id: null,
      createdAt: null
    }
  ];

  public static readonly SERVICE_VEHICLE: ServiceVehicle = {
    vin: 'V1RTUALV1N0000002',
    type: 'VIN',
    available: true,
    carData: {
      dtc: null,
      geolocation: {
        dataPoint: {
          geoSystem: 'WGS84',
          latitude: 49.00563,
          timestamp: '2020-05-08T08:04:37.867824411Z',
          longitude: 8.37320,
          value: null
        },
        error: null
      },
      checkControlMessages: {
        error: {
          code: '',
          message: ''
        },
        dataPoint: {
          timestamp: '2020-05-21T10:33:33.535539094Z',
          value: [
            {
              seatingCapacity: 0,
              status: 'UNKNOWN',
              message: 'Drive Battery Alert',
              value: 400,
              dtcs: [],
              vehicleSoftware: '',
              productionDate: '',
              registrationFirstDate: '',
              registrationCountry: '',
              brandName: '',
              modelName: '',
              bodyType: '',
              colorCode: '',
              colorText: '',
              vehicleConfiguration: []
            }
          ],
          longitude: 0,
          latitude: 0,
          geoSystem: ''
        }
      },
      basicVehicleData: {
        error: null,
        dataPoint: {
          timestamp: '2020-05-21T11:19:39.762436437Z',
          value: [
            {
              vehicleSoftware: 'VOS Rev1#c6c2d6ce566c3a6be013fe4ae24a8da636090876',
              seatingCapacity: 5,
              productionDate: '2020-01-21',
              registrationFirstDate: '2020-02-17',
              registrationCountry: 'DE',
              brandName: 'VirualOEM',
              modelName: 'B01',
              bodyType: 'Sedan',
              colorText: 'Silver Metallic',
              colorCode: 'XX01',
              vehicleConfiguration: [
                'EC1',
                'DC21',
                'OE51'
              ],
              value: 0,
              dtcs: [],
              message: '',
              status: ''
            }
          ],
          geoSystem: '',
          latitude: 0,
          longitude: 0
        }
      }
    },
    distance: 20
  };
}
