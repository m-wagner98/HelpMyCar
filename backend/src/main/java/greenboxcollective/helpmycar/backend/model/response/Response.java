package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** POJO to hold data item information (e.g. dtc, geolocation) */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Response {

  @JsonIgnore private final Map<String, Object> additionalProperties = new HashMap<>();
  private Dtc dtc;
  private Geolocation geolocation;

  @JsonProperty("checkControlMessages")
  @JsonAlias("checkcontrolmessages")
  private CheckControlMessage checkControlMessage;

  @JsonProperty("basicVehicleData")
  @JsonAlias("basicvehicledata")
  private BasicVehicleData basicVehicleData;

  public Response() {}

  public Dtc getDtc() {
    return this.dtc;
  }

  public void setDtc(Dtc dtc) {
    this.dtc = dtc;
  }

  public Geolocation getGeolocation() {
    return this.geolocation;
  }

  public void setGeolocation(Geolocation geolocation) {
    this.geolocation = geolocation;
  }

  public CheckControlMessage getCheckControlMessage() {
    return checkControlMessage;
  }

  public void setCheckControlMessage(CheckControlMessage checkControlMessage) {
    this.checkControlMessage = checkControlMessage;
  }

  public BasicVehicleData getBasicVehicleData() {
    return basicVehicleData;
  }

  public void setBasicVehicleData(BasicVehicleData basicVehicleData) {
    this.basicVehicleData = basicVehicleData;
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
   * Collects errors that appeared in all the requested data items from the response of the Caruso
   * API.
   *
   * @return List containing Error objects from all requested data items
   */
  @JsonIgnore
  public List<Error> getErrors() {
    List<Error> errorList = new ArrayList<>();
    if (dtc != null && dtc.getError() != null) {
      errorList.add(dtc.getError());
    }
    if (geolocation != null && geolocation.getError() != null) {
      errorList.add(geolocation.getError());
    }
    return errorList;
  }

  @Override
  public String toString() {
    System.out.println(checkControlMessage != null);
    String responseString = "{";
    if (dtc != null) {
      responseString += " dtc=" + dtc.toString();
    }
    if (geolocation != null) {
      responseString += " geolocation=" + geolocation.toString();
    }
    if (checkControlMessage != null) {
      responseString += " checkControlMessages=" + checkControlMessage.toString();
    }
    if (basicVehicleData != null) {
      responseString += " basicVehicleData=" + basicVehicleData.toString();
    }
    responseString += "}";
    return responseString;
  }

  public boolean hasVehicleLevelError() {
    return this.dtc != null && this.dtc.hasVehicleLevelError()
        || this.geolocation != null && this.geolocation.hasVehicleLevelError();
  }
}
