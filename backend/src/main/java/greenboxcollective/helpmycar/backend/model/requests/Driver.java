package greenboxcollective.helpmycar.backend.model.requests;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Driver implements Cloneable {

  private List<String> vinList;
  private String user;
  private String firstName;
  private String lastName;
  private long customerNumber;
  private String entryDate;
  private String residence;
  private String phoneNumber;
  private String email;

  public Driver() {}

  /** Driver constructor with all fields. */
  public Driver(
      List<String> vinList,
      String user,
      String firstName,
      String lastName,
      long customerNumber,
      String entryDate,
      String residence,
      String phoneNumber,
      String email) {
    this.vinList = vinList;
    this.user = user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.customerNumber = customerNumber;
    this.entryDate = entryDate;
    this.residence = residence;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

  public Driver(List<String> vinList, String user) {
    this.vinList = vinList;
    this.user = user;
  }

  public List<String> getVinList() {
    return vinList;
  }

  public void setVinList(List<String> vin) {
    this.vinList = vin;
  }

  public void addVin(String vin) {
    this.vinList.add(vin);
  }

  public void removeVin(String vin) {
    this.vinList.remove(vin);
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public long getCustomerNumber() {
    return this.customerNumber;
  }

  public void setCustomerNumber(long customerNumber) {
    this.customerNumber = customerNumber;
  }

  public String getEntryDate() {
    return this.entryDate;
  }

  public void setEntryDate(String entryDate) {
    this.entryDate = entryDate;
  }

  public String getResidence() {
    return this.residence;
  }

  public void setResidence(String residence) {
    this.residence = residence;
  }

  public String getPhoneNumber() {
    return this.phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String toString() {
    StringBuilder vins = new StringBuilder();
    for (String vin : vinList) {
      vins.append(vin);
    }
    return "{"
        + " vinList='"
        + vins
        + "'"
        + ", user='"
        + user
        + "'"
        + ", firstName='"
        + firstName
        + "'"
        + ", lastName='"
        + lastName
        + "'"
        + ", customerNumber='"
        + customerNumber
        + "'"
        + ", entryDate='"
        + entryDate
        + "'"
        + ", residence='"
        + residence
        + "'"
        + ", phoneNumber='"
        + phoneNumber
        + "'"
        + ", email='"
        + email
        + "'"
        + "}";
  }

  /**
   * Deep copy this driver.
   * @return a Clone of this Obj
   */
  public Driver clone() {
    return new Driver(new ArrayList<String>(this.vinList), this.user,
      this.firstName, this.lastName, this.customerNumber,
      this.entryDate, this.residence, this.phoneNumber, this.email);
  }
}
