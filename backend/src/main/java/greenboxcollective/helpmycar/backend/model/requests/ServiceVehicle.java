package greenboxcollective.helpmycar.backend.model.requests;

import greenboxcollective.helpmycar.backend.model.VehicleType;
import greenboxcollective.helpmycar.backend.model.response.Response;

public class ServiceVehicle {
  private String vin;
  private VehicleType type;
  private boolean available = true;
  private Response carData;

  public ServiceVehicle() {}

  public ServiceVehicle(String vin, VehicleType type) {
    this.vin = vin;
    this.type = type;
  }

  public String getVin() {
    return vin;
  }

  public void setVin(String vin) {
    this.vin = vin;
  }

  public VehicleType getType() {
    return type;
  }

  public void setType(VehicleType type) {
    this.type = type;
  }

  public Response getCarData() {
    return carData;
  }

  public void setCarData(Response carData) {
    this.carData = carData;
  }

  public boolean isAvailable() {
    return available;
  }

  public void setAvailable(boolean available) {
    this.available = available;
  }

  @Override
  public String toString() {
    return "ServiceVehicle{" + "vin='" + vin + '\'' + ", type=" + type + '}';
  }
}
