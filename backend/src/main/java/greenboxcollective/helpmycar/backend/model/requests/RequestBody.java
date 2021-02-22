package greenboxcollective.helpmycar.backend.model.requests;

import java.util.List;

public class RequestBody {

  private String version = "1.0";
  private List<Vehicle> vehicles;
  private List<String> dataItems;

  public RequestBody(List<Vehicle> vehicles, List<String> dataItems) {
    this.vehicles = vehicles;
    this.dataItems = dataItems;
  }

  public List<Vehicle> getVehicles() {
    return vehicles;
  }

  public void setVehicles(List<Vehicle> vehicles) {
    this.vehicles = vehicles;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public List<String> getDataItems() {
    return dataItems;
  }

  public void setDataItems(List<String> dataItems) {
    this.dataItems = dataItems;
  }

  @Override
  public String toString() {
    return "{"
        + " version='"
        + version
        + "'"
        + ", vehicles='"
        + vehicles.toString()
        + "'"
        + ", dataItems='"
        + dataItems.toString()
        + "'"
        + "}";
  }
}
