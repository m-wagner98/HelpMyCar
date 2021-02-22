package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** POJO root element to store Caruso API responses. */
public class ApiResponse {

  @JsonIgnore
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private final Map<String, Object> additionalProperties = new HashMap<>();

  private String version;
  private String deliveredAt;
  private List<InVehicleData> inVehicleData;

  public ApiResponse() {}

  public String getVersion() {
    return this.version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public String getDeliveredAt() {
    return this.deliveredAt;
  }

  public void setDeliveredAt(String deliveredAt) {
    this.deliveredAt = deliveredAt;
  }

  public List<InVehicleData> getInVehicleData() {
    return this.inVehicleData;
  }

  public void setInVehicleData(List<InVehicleData> inVehicleData) {
    this.inVehicleData = inVehicleData;
  }

  @JsonAnyGetter
  public Map<String, Object> getAdditionalProperties() {
    return this.additionalProperties;
  }

  @JsonAnySetter
  public void setAdditionalProperty(String name, Object value) {
    this.additionalProperties.put(name, value);
  }

  /**
   * Converts the String timestamp from the Caruso API response into a LocalDateTIme object. Uses
   * ISO 8601 Instant Format.
   *
   * @return LocalDateTime object
   */
  public LocalDateTime covertTimestamp() {
    DateTimeFormatter isoFormatter = DateTimeFormatter.ISO_INSTANT;
    Instant dateInstant = Instant.from(isoFormatter.parse(deliveredAt));
    return LocalDateTime.ofInstant(dateInstant, ZoneOffset.UTC);
  }

  /**
   * To check whether there is a Vehicle Level error.
   *
   * @return true if there is an error
   */
  public boolean hasVehicleLevelError() {
    for (InVehicleData inVehicleDataItem : inVehicleData) {
      if (inVehicleDataItem.hasVehicleLevelError()) {
        return true;
      }
    }
    return false;
  }

  @Override
  public String toString() {
    StringBuilder inVehicleDataString = new StringBuilder();
    for (InVehicleData vehicle : inVehicleData) {
      inVehicleDataString.append(vehicle.toString());
    }
    return "{"
        + " version="
        + version
        + ", deliveredAt="
        + deliveredAt
        + ", inVehicleData="
        + inVehicleDataString
        + "}";
  }
}
