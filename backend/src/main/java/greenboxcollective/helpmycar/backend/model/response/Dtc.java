package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

/** POJO to wrap data point information about the dtc data point. */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Dtc {

  private DataPoint dataPoint;
  private Error error;

  public Dtc() {}

  public DataPoint getDataPoint() {
    return this.dataPoint;
  }

  public void setDataPoint(DataPoint dataPoint) {
    this.dataPoint = dataPoint;
  }

  public Error getError() {
    return error;
  }

  public void setError(Error error) {
    this.error = error;
  }

  @Override
  public String toString() {
    String response = "{" + " dataPoint=" + dataPoint.toString() + " }";
    if (this.error != null) {
      response += " " + this.error.toString();
    }
    return response;
  }

  public boolean hasVehicleLevelError() {
    return this.error != null;
  }
}
