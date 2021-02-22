package greenboxcollective.helpmycar.backend.model.response;

public class Troublecode {
  private String dtcId;
  private String eculs;
  private int occurences;
  private String timestanmp;

  public Troublecode() {}

  public String getDtcId() {
    return dtcId;
  }

  public void setDtcId(String dtcId) {
    this.dtcId = dtcId;
  }

  public String getEculs() {
    return eculs;
  }

  public void setEculs(String eculs) {
    this.eculs = eculs;
  }

  public int getOccurences() {
    return occurences;
  }

  public void setOccurences(int occurences) {
    this.occurences = occurences;
  }

  public String getTimestanmp() {
    return timestanmp;
  }

  public void setTimestanmp(String timestanmp) {
    this.timestanmp = timestanmp;
  }

  @Override
  public String toString() {
    return "{"
        + " dtcId='"
        + dtcId
        + '\''
        + ", eculs='"
        + eculs
        + '\''
        + ", occurences="
        + occurences
        + ", timestanmp='"
        + timestanmp
        + '\''
        + '}';
  }
}
