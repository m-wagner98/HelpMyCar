package greenboxcollective.helpmycar.backend.logic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import greenboxcollective.helpmycar.backend.model.requests.Driver;
import greenboxcollective.helpmycar.backend.model.requests.ServiceVehicle;
import greenboxcollective.helpmycar.backend.model.requests.StartingScenarioEntry;
import greenboxcollective.helpmycar.backend.model.response.InVehicleData;

public class FileLoader {

  public FileLoader() {}

  /**
   * Read drivers.json and returns its content.
   *
   * @return content of drivers.json
   */
  public List<Driver> readUserProfiles() {
    Resource file = new ClassPathResource("drivers.json");
    InputStream input;
    Driver[] drivers = {};
    try {
      input = file.getInputStream();
      drivers = new ObjectMapper().readValue(readFromInputStream(input), Driver[].class);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return Arrays.asList(drivers);
  }

  /**
   * Read startingScenarioConfig.json and returns its content.
   *
   * @return content of startingScenarioConfig.json
   */
  public List<StartingScenarioEntry> readStartingScenario() {
    Resource file = new ClassPathResource("startingScenarioConfig.json");
    InputStream input;
    StartingScenarioEntry[] entries = {};
    try {
      input = file.getInputStream();
      entries =
          new ObjectMapper().readValue(readFromInputStream(input), StartingScenarioEntry[].class);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return Arrays.asList(entries);
  }

  /**
   * Read serviceVehicleList.json and return it's content.
   *
   * @return list of specified serviceVehicles
   */
  public List<ServiceVehicle> readServiceVehicleList() {
    Resource file = new ClassPathResource("serviceVehicleList.json");
    InputStream input;
    ServiceVehicle[] serviceVehicles = {};
    try {
      input = file.getInputStream();
      serviceVehicles =
          new ObjectMapper().readValue(readFromInputStream(input), ServiceVehicle[].class);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return Arrays.asList(serviceVehicles);
  }

  /**
   * Load the drivers.json File and returns its content.
   *
   * @return content of drivers.json
   */
  public List<InVehicleData> getMockInVehicleData() {
    Resource file = new ClassPathResource("mockApiResponse.json");
    InputStream input;
    InVehicleData[] inVehicleData = null;
    try {
      input = file.getInputStream();
      inVehicleData = new ObjectMapper()
          .readValue(readFromInputStream(input), InVehicleData[].class);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return Arrays.asList(inVehicleData);
  }

  /**
   * Loads the specified dataItems from the dataItemConfig.json file.
   * @return Map containing driver as key and the specified data items as values.
   */
  public Map<String, String[]> readDataItemConfig() {
    Resource file = new ClassPathResource("dataItemConfig.json");
    InputStream input;
    Map<String, String[]> dataItems = new HashMap<>();
    TypeReference<HashMap<String, String[]>> typeRef =
        new TypeReference<HashMap<String, String[]>>() {};
    try {
      input = file.getInputStream();
      dataItems = new ObjectMapper().readValue(readFromInputStream(input), typeRef);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return dataItems;
  }

  private String readFromInputStream(InputStream inputStream) {
    StringBuilder resultStringBuilder = new StringBuilder();
    try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
      String line;
      while ((line = br.readLine()) != null) {
        resultStringBuilder.append(line).append("\n");
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return resultStringBuilder.toString();
  }
}
