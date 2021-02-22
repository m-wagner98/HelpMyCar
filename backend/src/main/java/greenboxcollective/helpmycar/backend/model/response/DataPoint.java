package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

/**
 * POJO that holds various attributes for different data points, for geolocation: geoSystem,
 * latitude, timestamp, longitude, for dtc: value, timestamp.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataPoint {

  @JsonIgnore private final Map<String, Object> additionalProperties = new HashMap<>();
  private String geoSystem;
  private Double latitude;
  private String timestamp;
  private Double longitude;

  @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
  private List<Value> value;

  public DataPoint() {}

  public String getGeoSystem() {
    return this.geoSystem;
  }

  public void setGeoSystem(String geoSystem) {
    this.geoSystem = geoSystem;
  }

  public Double getLatitude() {
    return this.latitude;
  }

  public void setLatitude(Double latitude) {
    this.latitude = latitude;
  }

  public String getTimestamp() {
    return this.timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public Double getLongitude() {
    return this.longitude;
  }

  public void setLongitude(Double longitude) {
    this.longitude = longitude;
  }

  public List<Value> getValue() {
    return value;
  }

  public void setValue(List<Value> newValue) {this.value = newValue;}

  public void setCheckControlMessages(List<Value> value) {
    this.value = value;
  }

  @JsonAnyGetter
  public Map<String, Object> getAdditionalProperties() {
    return this.additionalProperties;
  }

  @JsonAnySetter
  public void setAdditionalProperty(String name, Object value) {
    this.additionalProperties.put(name, value);
  }

  @Override
  public String toString() {
    if (geoSystem != null) {
      return "{"
          + " geoSystem='"
          + geoSystem
          + "'"
          + ", latitude="
          + latitude
          + ", timestamp='"
          + timestamp
          + "'"
          + ", longitude="
          + longitude
          + " }";
    } else if (value != null) {
      String result = "{ value=[ ";
      StringJoiner joiner = new StringJoiner(",");
      for (Value val : value) {
        joiner.add(val.toString());
      }
      return result + joiner.toString() + " ] }";
    } else {
      return null;
    }
  }
}
