package greenboxcollective.helpmycar.backend.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import greenboxcollective.helpmycar.backend.logic.FileLoader;
import greenboxcollective.helpmycar.backend.model.Status;
import greenboxcollective.helpmycar.backend.model.requests.ChatMessage;
import greenboxcollective.helpmycar.backend.model.requests.ChatMessageList;
import greenboxcollective.helpmycar.backend.model.requests.Driver;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequest;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequestList;
import greenboxcollective.helpmycar.backend.model.requests.ServiceVehicle;
import greenboxcollective.helpmycar.backend.model.requests.StartingScenarioEntry;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import greenboxcollective.helpmycar.backend.model.response.DataPoint;
import greenboxcollective.helpmycar.backend.model.response.InVehicleData;
import greenboxcollective.helpmycar.backend.model.response.Value;

@RestController
@CrossOrigin(origins = {"*"})
public class FrontendRestController {

  private final ApiController apiController = ApiController.getInstance();
  //  private final double[] mockLat = {49.478100, 49.166868, 49.432756, 49.355303};
  //  private final double[] mockLong = {8.503455, 8.622682, 8.419408, 8.423344};
  private List<Driver> drivers;
  private List<ServiceVehicle> serviceVehicles;
  private List<HelpRequest> requestList;
  private List<ChatMessage> messageList;
  private Map<Driver, ApiResponse> driverCarData;
  private Map<Integer, String> requestServiceVehicleMap;

  @PostConstruct
  private void initialize() {
    this.drivers = new FileLoader().readUserProfiles();
    this.serviceVehicles = new FileLoader().readServiceVehicleList();
    this.requestList = HelpRequestList.getInstance().getRequestList();
    this.messageList = ChatMessageList.getInstance().getMessageList();
    this.driverCarData = new HashMap<>();
    this.requestServiceVehicleMap = new HashMap<>();
    loadStartingScenario();
  }

  /**
   * Handles Driver login Requests.
   *
   * @param user Accepts a pre Registered username
   * @return driver if match was found, else return null
   */
  @GetMapping("/login")
  public Driver login(@RequestParam(value = "user") String user) {
    return findDriverByUsername(user);
  }

  /**
   * Get Interface for Driver information.
   *
   * @param user Accepts a pre Registered username
   * @return driver if match was found, else return null
   */
  @GetMapping("/getUserInfo")
  public Driver getUserInfo(@RequestParam(value = "user") String user) {
    return findDriverByUsername(user);
  }

  /**
   * Get interface for user specific vehicle information.
   *
   * @param user Accepts a pre Registered username
   * @param vin optional VIN specification
   * @throws IllegalArgumentException if the given user is not found or contains no vehicles.
   * @return vehicle information for all registered vehicles if user was found, or for a single VIN
   *     if specified.
   */
  @GetMapping("/getVehicleInformation")
  public ApiResponse getUserVehicleInformation(
      @RequestParam(value = "user") String user,
      @RequestParam(value = "vin", required = false) String vin)
      throws IllegalArgumentException {
    List<String> vinList = new ArrayList<>();
    Driver requestingDriver = findDriverByUsername(user);
    if (vin != null && requestingDriver.getVinList().contains(vin)) {
      vinList.add(vin);
    } else {
      vinList = requestingDriver.getVinList();
    }
    if (driverCarData.containsKey(requestingDriver)) {
      return driverCarData.get(requestingDriver);
    }
    ApiResponse response = ApiController.getInstance().doPost(vinList);
    if (response.getInVehicleData().size() > 1) {
      List<InVehicleData> orderedData = orderApiResponse(vinList, response);
      response.setInVehicleData(orderedData);
    }
    // Julia's vehicles need special values for demonstration purposes
    if (user.equals("juliaBecker")) {
      // new CheckControlMessage.Value
      overrideCheckControlMessages(response);
    }
    driverCarData.put(requestingDriver, response);
    return response;
  }

  private List<InVehicleData> orderApiResponse(List<String> vinList, ApiResponse response) {
    List<InVehicleData> orderedList = new ArrayList<>();
    for (String vin : vinList) {
      for (InVehicleData data : response.getInVehicleData()) {
        if (vin.equals(data.getIdentifier().getValue())) {
          orderedList.add(data);
        }
      }
    }
    return orderedList;
  }


  /**
   * Returns a List of ServiceVehicles with their corresponding car data.
   *
   * @return list of ServiceVehicles and car data
   */
  @GetMapping("/getAllServiceVehicles")
  public List<ServiceVehicle> getServiceVehicles() {
    // One request for all vehicles
    List<String> vinList = new ArrayList<>();
    for (ServiceVehicle vehicle : serviceVehicles) {
      vinList.add(vehicle.getVin());
    }
    ApiResponse response = ApiController.getInstance().doPost(vinList);
    int i = serviceVehicles.size() - 1;
    for (ServiceVehicle vehicle : serviceVehicles) {
      vehicle.setCarData(response.getInVehicleData().get(i--).getResponse());
    }
    return serviceVehicles;
  }

  /**
   * Check if the given user already sent a help request that is not closed.
   *
   * @param user username of the driver
   * @return the HelpRequest object if there is an active one, else null
   */
  @GetMapping("/getActiveRequest")
  public HelpRequest getActiveRequest(String user) {
    for (HelpRequest req : requestList) {
      if (req.getDriver().getUser().equals(user) && req.getStatus() != Status.CLOSED) {
        return req;
      }
    }
    return null;
  }

  /**
   * Returns the service vehicle assigned to a help request.
   *
   * @param reqId if of a HelpRequest
   * @return ServiceVehicle object
   */
  @GetMapping("/getAssignedServiceVehicle")
  public ServiceVehicle assignServiceVehicle(Integer reqId) {
    String vin = requestServiceVehicleMap.get(reqId);
    for (ServiceVehicle vehicle : serviceVehicles) {
      if (vehicle.getVin().equals(vin)) {
        return vehicle;
      }
    }
    throw new IllegalArgumentException("ID has no corresponding ServiceVehicle!");
  }

  /**
   * Updates the availability of a service vehicle.
   *
   * @param vin of the service vehicle
   * @param reqId of a help request
   * @return service vehicle that changed
   */
  @GetMapping("/updateAvailability")
  public ServiceVehicle updateAvailability(Integer reqId, String vin) {
    for (ServiceVehicle vehicle : serviceVehicles) {
      if (vehicle.getVin().equals(vin)) {
        if (vehicle.isAvailable()) {
          vehicle.setAvailable(!vehicle.isAvailable());
          requestServiceVehicleMap.put(reqId, vin);
        } else {
          vehicle.setAvailable(!vehicle.isAvailable());
        }
        return vehicle;
      }
    }
    throw new IllegalArgumentException("VIN not registered!");
  }

  /**
   * Resets all saved information to get a fresh start.
   *
   * @return Confirmation String
   */
  @GetMapping("/resetBackend")
  public String resetBackend() {
    this.requestServiceVehicleMap.clear();
    this.messageList.clear();
    this.driverCarData.clear();
    this.serviceVehicles = new FileLoader().readServiceVehicleList();
    this.requestList.clear();
    loadStartingScenario();
    System.out.println("Backend reset");
    return "Backend reset!";
  }

  /**
   * Loads the starting scenario defined in startingScenarioConfig.json and sets up the system to
   * function properly.
   */
  private void loadStartingScenario() {
    FileLoader fileLoader = new FileLoader();
    List<StartingScenarioEntry> loadedEntries = fileLoader.readStartingScenario();
    List<HelpRequest> builtRequests = buildHelpRequest(loadedEntries);
    for (int i = 0; i < builtRequests.size(); i++) {
      HelpRequest req = builtRequests.get(i);
      req.setId(HelpRequestList.getInstance().getRequestList().size());
      if (req.getStatus().equals(Status.CLOSED)
          || req.getStatus().equals(Status.SERVICE_VEHICLE_ON_THE_WAY)) {
        int serviceVehicleIndex = i % serviceVehicles.size();
        requestServiceVehicleMap.put(
            req.getId(), serviceVehicles.get(serviceVehicleIndex).getVin());
        if (req.getStatus().equals(Status.SERVICE_VEHICLE_ON_THE_WAY)) {
          ServiceVehicle assignedVehicle = serviceVehicles.get(serviceVehicleIndex);
          assignedVehicle.setAvailable(false);
          ApiResponse response =
              ApiController.getInstance().doPost(Arrays.asList(assignedVehicle.getVin()));
          assignedVehicle.setCarData(response.getInVehicleData().get(0).getResponse());
        }
      }
      HelpRequestList.getInstance().getRequestList().add(req);
    }
  }

  /**
   * Constructs HelpRequest objects from the given StartingScenarioEntry objects.
   *
   * @param entryList StartingScenarioEntry List loaded from the .json config
   * @return List of newly built HelpRequest
   */
  private List<HelpRequest> buildHelpRequest(List<StartingScenarioEntry> entryList) {
    List<HelpRequest> builtRequests = new ArrayList<>();
    List<String> vinList = new ArrayList<>();
    Random random = new Random(1234);
    long date = System.currentTimeMillis();
    int offset = TimeZone.getTimeZone("Europe/Berlin").getOffset(date);
    int timeDifference = (600000 + (random.nextInt(300000) - 300000));
    int i = 0;
    for (StartingScenarioEntry entry : entryList) {
      HelpRequest newRequest = new HelpRequest();
      newRequest.setDriver(findDriverByUsername(entry.getUser()));
      newRequest.setStatus(entry.getStatus());
      Timestamp stamp = new Timestamp((date + offset) - timeDifference * (entryList.size() - i++));
      newRequest.setCreatedAt(stamp.toString());
      vinList.add(entry.getVin());
      builtRequests.add(newRequest);
    }
    ApiResponse combinedResponse = ApiController.getInstance().doPost(vinList);
    List<ApiResponse> splitResponse = splitApiResponse(combinedResponse);
    for (StartingScenarioEntry entry : entryList) {
      for (HelpRequest req : builtRequests) {
        if (entry.getUser().equals(req.getDriver().getUser())) {
          ApiResponse fittingResponse = getApiResponseByVin(splitResponse, entry.getVin());
          req.setApiResponse(fittingResponse);
        }
      }
    }
    return builtRequests;
  }

  private ApiResponse getApiResponseByVin(List<ApiResponse> response, String vin) {
    for (ApiResponse res : response) {
      if (res.getInVehicleData().get(0).getIdentifier().getValue().equals(vin)) {
        return res;
      }
    }
    return null;
  }

  private Driver findDriverByUsername(String user) {
    for (Driver driver : this.drivers) {
      if (driver.getUser().equals(user)) {
        return driver;
      }
    }
    throw new IllegalArgumentException("username not in driverList!");
  }

  private List<ApiResponse> splitApiResponse(ApiResponse combinedResponse) {
    int size = combinedResponse.getInVehicleData().size();
    List<ApiResponse> splitResponseList = new ArrayList<>();
    for (int i = size - 1; i >= 0; i--) {
      ApiResponse singleResponse = new ApiResponse();
      singleResponse.setDeliveredAt(combinedResponse.getDeliveredAt());
      singleResponse.setVersion(combinedResponse.getVersion());
      singleResponse.setInVehicleData(Arrays.asList(combinedResponse.getInVehicleData().get(i)));
      splitResponseList.add(singleResponse);
    }
    return splitResponseList;
  }

  // Start of polling API

  /**
   * Adds a HelpRequest to the requestList.
   *
   * @param user driver that sent the request.
   * @param vin car that broke down
   * @return the added HelpRequest
   */
  @GetMapping("/addRequest")
  public HelpRequest addRequest(String user, String vin) {
    Driver reqDriver = null;
    for (Driver driver : drivers) {
      if (driver.getUser().equals(user)) {
        reqDriver = driver.clone();
      }
    }
    if (reqDriver != null) {
      reqDriver.setVinList(Arrays.asList(vin));
      ApiResponse apiResponse = apiController.doPost(reqDriver.getVinList());
      // Julia's vehicles need special values for demonstration purposes
      if (user.equals("juliaBecker")) {
        // new CheckControlMessage.Value
        overrideCheckControlMessages(apiResponse);
      }
      HelpRequest newHelpRequest =
          new HelpRequest(reqDriver, apiResponse, Status.OPEN, requestList.size());
      System.out.println("New Request: " + newHelpRequest);
      requestList.add(newHelpRequest);
      return newHelpRequest;
    } else {
      return null;
    }
  }

  /**
   * Adds a ChatMessage to the messageList.
   *
   * @param chatMessage Message that gets added
   * @return the added ChatMessage
   */
  @PostMapping("/addChatMessage")
  public ChatMessage addChatMessage(@RequestBody ChatMessage chatMessage) {
    System.out.println("New Chat Message: " + chatMessage.toString());
    messageList.add(chatMessage);
    return chatMessage;
  }

  /**
   * Updates the status of a HelpRequest.
   *
   * @param requestId Request id whose status needs to be updated
   * @return the updated HelpRequest
   */
  @GetMapping("/updateStatus")
  public HelpRequest updateStatus(int requestId) {
    HelpRequest request = requestList.get(requestId);
    request.setStatus(request.getStatus().next());
    return request;
  }

  @GetMapping("/getRequestList")
  public List<HelpRequest> getRequestList() {
    return requestList;
  }

  @GetMapping("/getMessageList")
  public List<ChatMessage> getMessageList() {
    return messageList;
  }

  private void overrideCheckControlMessages (ApiResponse response) {
    List<Value> controlMessageValue = new ArrayList<>();
    Value v1 = new Value();
    v1.setSeatingCapacity(0);
    v1.setControlMessageStatus("CRITICAL");
    v1.setControlMessage("Check Engine");
    v1.setControlMessageValue(500);
    Value v2 = new Value();
    v2.setSeatingCapacity(0);
    v2.setControlMessageStatus("CRITICAL");
    v2.setControlMessage("Coolant Temperature Warning");
    v2.setControlMessageValue(250);
    controlMessageValue.add(v1);
    controlMessageValue.add(v2);
    for (InVehicleData vehicleData: response.getInVehicleData()) {
      // one vehicle needs these two check control messages, the others must not have any
      if (vehicleData.getIdentifier().getValue().equals("V1RTUALV1N0000003")) {
        vehicleData.getResponse().getCheckControlMessage().setDataPoint(
                new DataPoint());
        vehicleData.getResponse().getCheckControlMessage().getDataPoint().setValue(controlMessageValue);
      }
      else { // no CheckControlMessages allowed
        vehicleData.getResponse().setCheckControlMessage(null);
      }
    }
  }
}
