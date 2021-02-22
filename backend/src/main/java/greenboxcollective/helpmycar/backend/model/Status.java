package greenboxcollective.helpmycar.backend.model;

public enum Status {
  OPEN,
  IN_PROGRESS,
  SERVICE_VEHICLE_ON_THE_WAY,
  CLOSED;

  private static final Status[] values = values();

  public Status next() {
    return values[(this.ordinal() + 1) % values.length];
  }
}
