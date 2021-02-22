package greenboxcollective.helpmycar.backend.model.requests;

import greenboxcollective.helpmycar.backend.model.Status;

public class StartingScenarioEntry {
  private String vin;
  private String user;
  private Status status;

  public StartingScenarioEntry() {}

  public String getVin() {
    return vin;
  }

  public void setVin(String vin) {
    this.vin = vin;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "StartingScenarioEntry{"
        + "vin='"
        + vin
        + '\''
        + ", user='"
        + user
        + '\''
        + ", status="
        + status
        + '}';
  }
}
