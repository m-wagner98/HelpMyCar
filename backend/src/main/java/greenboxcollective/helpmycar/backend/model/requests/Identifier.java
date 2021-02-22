package greenboxcollective.helpmycar.backend.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

/** POJO to hold type and value of a vehicle. */
// @JsonTypeInfo(use = Id.NAME, include = As.WRAPPER_OBJECT)
// @JsonTypeName("identifier")
public class Identifier {

  private String type;
  private String value;

  public Identifier(String type, String value) {
    this.type = type;
    this.value = value;
  }

  public Identifier() {}

  @JsonProperty("type")
  public String getType() {
    return type;
  }

  @JsonProperty("type")
  public void setType(String type) {
    this.type = type;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return "{" + " type='" + type + "'" + ", value='" + value + "'" + " }";
  }
}
