package greenboxcollective.helpmycar.backend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import greenboxcollective.helpmycar.backend.controller.ApiController;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import greenboxcollective.helpmycar.backend.model.response.DataPoint;
import greenboxcollective.helpmycar.backend.model.response.Dtc;
import greenboxcollective.helpmycar.backend.model.response.Error;
import greenboxcollective.helpmycar.backend.model.response.InVehicleData;
import greenboxcollective.helpmycar.backend.model.response.Response;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class ModelResponseTest {
  private static final ApiController apiController = ApiController.getInstance();
  private static InVehicleData sample;
  private static InVehicleData sampleWithErrors;
  private static InVehicleData sampleWithNullValues;

  @BeforeAll
  static void initialize() {
    List<String> vins = new ArrayList<>();
    vins.add("V1RTUALV1N0000001");
    vins.add("V1RTUALV1N0000002");
    vins.add("V1RTUALV1N0000003");
    ApiResponse sampleResponse = apiController.doPost(vins);
    sample = sampleResponse.getInVehicleData().get(0);
    sampleWithErrors = sampleResponse.getInVehicleData().get(1);
    sampleWithNullValues = sampleResponse.getInVehicleData().get(2);
    sample.getResponse().setDtc(new Dtc());
    sample.getResponse().getDtc().setDataPoint(new DataPoint());
    sampleWithErrors.setError(new Error());
    sampleWithErrors.getResponse().setDtc(new Dtc());
    sampleWithErrors.getResponse().getDtc().setError(new Error());
    sampleWithErrors.getResponse().getDtc().setDataPoint(new DataPoint());
    // sampleWithErrors.getResponse().getDtc().getDataPoint().setValue(new Value());
    sampleWithErrors.getResponse().getGeolocation().setError(new Error());
    sampleWithNullValues.getResponse().setDtc(null);
    sampleWithNullValues.getResponse().setGeolocation(null);
  }

  @Test
  public void responseHasVehicleErrorFalseTest() {
    Response response = sample.getResponse();
    assertFalse(response.hasVehicleLevelError());
  }

  @Test
  public void responseHasVehicleErrorTrueNullTest() {
    Response response = sampleWithNullValues.getResponse();
    System.out.println(sampleWithNullValues.getResponse());
    assertFalse(response.hasVehicleLevelError());
  }

  @Test
  public void responseHasVehicleErrorTrueDtcAndGeolocationTest() {
    Response response = sampleWithErrors.getResponse();
    assertTrue(response.hasVehicleLevelError());
    response.setDtc(null);
    assertTrue(response.hasVehicleLevelError());
  }

  @Test
  public void responseGetErrorsEmptyTest() {
    Response response = sample.getResponse();
    assertTrue(response.getErrors().isEmpty());
  }

  @Test
  public void responseGetErrorsDtcAndGeolocationTest() {
    Response response = sampleWithErrors.getResponse();
    assertEquals(2, response.getErrors().size());
  }

  @Test
  public void responseGetErrorsDtcAndGeolocationNullTest() {
    Response response = sampleWithNullValues.getResponse();
    assertEquals(0, response.getErrors().size());
    assertEquals(0, response.getErrors().size());
  }

  @Test
  public void responseSetAdditionalPropertiesTest() {
    Response response = sample.getResponse();
    response.setAdditionalProperty("test", new Dtc());
    assertFalse(response.getAdditionalProperties().isEmpty());
  }

  @Test
  public void responseToStringTest() {
    String sampleString = sample.toString();
    assertTrue(sampleString.contains("V1RTUALV1N"));
    assertTrue(sampleString.contains("geoSystem"));
    assertTrue(sampleString.contains("dataPoint"));
    String sampleWithErrorsString = sampleWithErrors.toString();
    assertTrue(sampleWithErrorsString.contains("V1RTUALV1N"));
    assertTrue(sampleWithErrorsString.contains("Error"));
    String sampleWithNullValuesString = sampleWithNullValues.toString();
    assertTrue(sampleWithNullValuesString.contains("V1RTUALV1N"));
  }
}
