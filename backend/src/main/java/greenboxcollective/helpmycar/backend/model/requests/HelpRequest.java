package greenboxcollective.helpmycar.backend.model.requests;

import greenboxcollective.helpmycar.backend.model.Status;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import java.sql.Timestamp;
import java.util.TimeZone;

public class HelpRequest {

  private Driver driver;
  private ApiResponse apiResponse;
  private Status status;
  private int id;
  private String createdAt;

  public HelpRequest() {}

  /**
   * Wrapper class for help requests containing an ID, driver data, the status of the request and
   * the vehicle data.
   *
   * @param driver information about the driver that opened the request
   * @param apiResponse response from the Caruso API containing vehicle data
   * @param status current status of the request
   * @param id id of the request
   */
  public HelpRequest(Driver driver, ApiResponse apiResponse, Status status, int id) {
    this.driver = driver;
    this.apiResponse = apiResponse;
    this.status = status;
    this.id = id;
    long date = System.currentTimeMillis();
    int offset = TimeZone.getTimeZone("Europe/Berlin").getOffset(date);
    this.createdAt = new Timestamp(date + offset).toString();
  }

  public Driver getDriver() {
    return driver;
  }

  public void setDriver(Driver driver) {
    this.driver = driver;
  }

  public ApiResponse getApiResponse() {
    return apiResponse;
  }

  public void setApiResponse(ApiResponse apiResponse) {
    this.apiResponse = apiResponse;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  @Override
  public String toString() {
    return "HelpRequest{"
        + "driver="
        + driver
        + ", apiResponse="
        + apiResponse
        + ", status='"
        + status.toString()
        + '\''
        + ", createdAt='"
        + createdAt
        + '}';
  }
}
