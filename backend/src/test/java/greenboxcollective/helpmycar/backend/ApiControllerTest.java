package greenboxcollective.helpmycar.backend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import greenboxcollective.helpmycar.backend.controller.ApiController;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ApiControllerTest {

  private final ApiController apiController = ApiController.getInstance();
  private List<String> vins;

  @BeforeEach
  void initialize() {
    System.out.println("Initializing ApiController Test!");
    vins = new ArrayList<>();
  }

  @Test
  public void testSendPostOneVin() {
    vins.add("V1RTUALV1N0000001");
    ApiResponse response = apiController.doPost(vins);
    System.out.println(response.toString());
    assertNotNull(response);
    assertNotNull(response.getInVehicleData());
  }

  @Test
  public void testSendPostMultipleVin() {
    vins.add("V1RTUALV1N0000001");
    vins.add("V1RTUALV1N0000002");
    ApiResponse response = apiController.doPost(vins);
    assertNotNull(response);
    assertEquals(2, response.getInVehicleData().size());
  }

  @AfterEach
  void teardown() {
    System.out.print("Teardown!");
    vins.clear();
  }
}
