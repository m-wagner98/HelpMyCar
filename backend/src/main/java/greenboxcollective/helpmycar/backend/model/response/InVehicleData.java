package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import greenboxcollective.helpmycar.backend.model.requests.Identifier;

/**
 * POJO to hold information about a vehicle 1. the vehicles' identifier 2. the response wich
 * includes all requested data point information.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InVehicleData {

  private Identifier identifier;
  private Response response;
  private Error error;

  public InVehicleData() {}

  public Identifier getIdentifier() {
    return this.identifier;
  }

  public void setIdentifier(Identifier identifier) {
    this.identifier = identifier;
  }

  public Response getResponse() {
    return this.response;
  }

  public void setResponse(Response response) {
    this.response = response;
  }

  public Error getError() {
    return error;
  }

  public void setError(Error error) {
    this.error = error;
  }

  @Override
  public String toString() {
    if (error != null) {
      return "{" + " identifier=" + identifier.toString() + ", response=" + error.toString() + "}";
    } else {
      return "{"
          + " identifier="
          + identifier.toString()
          + ", response="
          + response.toString()
          + "}";
    }
  }

  public boolean hasVehicleLevelError() {
    return this.error != null || (this.response != null && this.response.hasVehicleLevelError());
  }
}
