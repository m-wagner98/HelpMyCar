package greenboxcollective.helpmycar.backend.model.requests;

public class Vehicle {

  private Identifier identifier;

  public Vehicle() {}

  public Vehicle(Identifier identifier) {
    this.identifier = identifier;
  }

  public Identifier getIdentifier() {
    return this.identifier;
  }

  public void setIdentifier(Identifier identifier) {
    this.identifier = identifier;
  }

  @Override
  public String toString() {
    return "{" + " identifier='" + identifier.toString() + "'" + "}";
  }
}
