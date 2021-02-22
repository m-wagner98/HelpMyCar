package greenboxcollective.helpmycar.backend.logic;

import greenboxcollective.helpmycar.backend.model.requests.Identifier;
import greenboxcollective.helpmycar.backend.model.requests.RequestBody;
import greenboxcollective.helpmycar.backend.model.requests.Vehicle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class RequestBuilder {

  private static RequestBuilder instance;
  private static List<String> driverDataItems;

  private RequestBuilder() {}

  /**
   * Singleton implementation.
   *
   * @return static instance of this class.
   */
  public static RequestBuilder getInstance() {
    if (instance == null) {
      instance = new RequestBuilder();
      Map<String, String[]> dataItems = new FileLoader().readDataItemConfig();
      driverDataItems = Arrays.asList(dataItems.get("driver"));
    }
    return instance;
  }

  /**
   * Builds the request body for the remote server API request.
   *
   * @param vinList Virtual identification number list
   * @return Response with data from server
   */
  public RequestBody generateRequest(List<String> vinList) {
    final List<Vehicle> vehiclesList = new ArrayList<>();
    for (String vin : vinList) {
      vehiclesList.add(new Vehicle(new Identifier("VIN", vin)));
    }
    return new RequestBody(vehiclesList, driverDataItems);
  }
}
