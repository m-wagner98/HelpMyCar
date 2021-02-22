package greenboxcollective.helpmycar.backend.model.response;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

/** POJO to hold information directly linked to the dtc data point. */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Value {

  // DTC's
  @JsonIgnore private final Map<String, Object> additionalProperties = new HashMap<>();
  private List<Troublecode> dtcs = null;

  // checkControlMessages
  @JsonProperty("status")
  private String controlMessageStatus;

  @JsonProperty("message")
  private String controlMessage;

  @JsonProperty("value")
  private int controlMessageValue;

  // basicVehicleInformation
  private String vehicleSoftware;
  private int seatingCapacity;
  private String productionDate;
  private String registrationFirstDate;
  private String registrationCountry;
  private String brandName;
  private String modelName;
  private String bodyType;
  private String colorText;
  private String colorCode;
  private List<String> vehicleConfiguration;

  public Value() {}

  public List<Troublecode> getDtcs() {
    return dtcs;
  }

  public void setDtcs(List<Troublecode> dtcs) {
    this.dtcs = dtcs;
  }

  @JsonAnyGetter
  public Map<String, Object> getAdditionalProperties() {
    return this.additionalProperties;
  }

  @JsonAnySetter
  public void setAdditionalProperty(String name, Object value) {
    this.additionalProperties.put(name, value);
  }

  public String getControlMessageStatus() {
    return controlMessageStatus;
  }

  public void setControlMessageStatus(String controlMessageStatus) {
    this.controlMessageStatus = controlMessageStatus;
  }

  public String getControlMessage() {
    return controlMessage;
  }

  public void setControlMessage(String controlMessage) {
    this.controlMessage = controlMessage;
  }

  public int getControlMessageValue() {
    return controlMessageValue;
  }

  public void setControlMessageValue(int controlMessageValue) {
    this.controlMessageValue = controlMessageValue;
  }

  public String getBrandName() {
    return brandName;
  }

  public void setBrandName(String brandName) {
    this.brandName = brandName;
  }

  public String getModelName() {
    return modelName;
  }

  public void setModelName(String modelName) {
    this.modelName = modelName;
  }

  public String getBodyType() {
    return bodyType;
  }

  public void setBodyType(String bodyType) {
    this.bodyType = bodyType;
  }

  public String getColorText() {
    return colorText;
  }

  public void setColorText(String colorText) {
    this.colorText = colorText;
  }

  public String getProductionDate() {
    return productionDate;
  }

  public void setProductionDate(String productionDate) {
    this.productionDate = productionDate;
  }

  public String getVehicleSoftware() {
    return vehicleSoftware;
  }

  public void setVehicleSoftware(String vehicleSoftware) {
    this.vehicleSoftware = vehicleSoftware;
  }

  public int getSeatingCapacity() {
    return seatingCapacity;
  }

  public void setSeatingCapacity(int seatingCapacity) {
    this.seatingCapacity = seatingCapacity;
  }

  public String getRegistrationFirstDate() {
    return registrationFirstDate;
  }

  public void setRegistrationFirstDate(String registrationFirstDate) {
    this.registrationFirstDate = registrationFirstDate;
  }

  public String getRegistrationCountry() {
    return registrationCountry;
  }

  public void setRegistrationCountry(String registrationCountry) {
    this.registrationCountry = registrationCountry;
  }

  public String getColorCode() {
    return colorCode;
  }

  public void setColorCode(String colorCode) {
    this.colorCode = colorCode;
  }

  public List<String> getVehicleConfiguration() {
    return vehicleConfiguration;
  }

  public void setVehicleConfiguration(List<String> vehicleConfiguration) {
    this.vehicleConfiguration = vehicleConfiguration;
  }

  @Override
  public String toString() {
    if (dtcs != null) {
      String result = "{ ";
      StringJoiner joiner = new StringJoiner(",");
      for (Troublecode code : dtcs) {
        joiner.add(code.toString());
      }
      return result + joiner.toString() + " }";
    }
    if (controlMessage != null && controlMessageStatus != null) {
      return "{"
          + " status='"
          + controlMessageStatus
          + "'"
          + ", message='"
          + controlMessage
          + "'"
          + ", value="
          + controlMessageValue
          + "}";
    } else {
      StringJoiner joiner = new StringJoiner(",");
      for (String conf : vehicleConfiguration) {
        joiner.add(conf);
      }
      return "{"
          + " brandName='"
          + brandName
          + "'"
          + ", modelName='"
          + modelName
          + "'"
          + ", bodyType='"
          + bodyType
          + "'"
          + ", seatingCapacity='"
          + seatingCapacity
          + "'"
          + ", colorText='"
          + colorText
          + "'"
          + ", colorCode='"
          + colorCode
          + "'"
          + ", vehicleSoftware='"
          + vehicleSoftware
          + "'"
          + ", vehicleConfiguration='"
          + joiner.toString()
          + "'"
          + ", productionDate='"
          + productionDate
          + "'"
          + ", registrationFirstDate='"
          + registrationFirstDate
          + "'"
          + ", registrationCountry='"
          + registrationCountry
          + "'"
          + '}';
    }
  }
}
