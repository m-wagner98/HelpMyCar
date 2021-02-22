package greenboxcollective.helpmycar.backend.logic;

import java.util.ArrayList;
import java.util.List;

import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import greenboxcollective.helpmycar.backend.model.response.InVehicleData;

public class MockResponseBuilder {

  /**
   * Builds a mock ApiResponse.
   * @param nrOfVehicles number of vehicles included in "InVehicleData" field of the response
   * @return ApiResponse
   */
  public static ApiResponse buildMockResponse(int nrOfVehicles,List<String> specificVins) {
    ApiResponse apiResponse = new ApiResponse();
    apiResponse.setDeliveredAt("2020-06-22T07:48:01.378Z");
    apiResponse.setVersion("1.0");
    List<InVehicleData> mockData = new FileLoader().getMockInVehicleData();
    List<InVehicleData> inVehicleDataList = new ArrayList<>();
    for (int i = 0; i < nrOfVehicles; i++) {
      String currentVin = specificVins.get(i % nrOfVehicles);
      int indexOfSpecificVin = findVin(mockData, currentVin);
      InVehicleData mockInVehicleData = mockData.get(indexOfSpecificVin);
      mockInVehicleData.getIdentifier().setValue(currentVin);
      inVehicleDataList.add(mockInVehicleData);
    }
    apiResponse.setInVehicleData(inVehicleDataList);
    return apiResponse;
  }

  private static int findVin(List<InVehicleData> data, String vin) {
    for (int i = 0; i < data.size(); i++) {
      if (data.get(i).getIdentifier().getValue().compareTo(vin) == 0) {
        return i;
      }
    }
    return 0;
  }
}