package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CheckControlMessage {
  private DataPoint dataPoint;
  private Error error;

  public CheckControlMessage() {}

  public DataPoint getDataPoint() {
    return dataPoint;
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
    String response = "{" + " dataPoint=" + dataPoint.toString() + "}";
    if (this.error != null) {
      response += " " + this.error.toString();
    }
    return response;
  }
}
