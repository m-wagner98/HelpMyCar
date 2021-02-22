package greenboxcollective.helpmycar.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import greenboxcollective.helpmycar.backend.model.requests.HelpRequest;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequestList;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class FrontendRestControllerTest {

  @LocalServerPort int randomServerPort;

  @Test
  void frontendRestControllerLoginWorkingUserTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri = "http://localhost:" + randomServerPort + "/login?user=juliaBecker";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("user"));
    assertTrue(Objects.requireNonNull(result.getBody()).contains("juliaBecker"));
  }

  @Test
  void frontendRestControllerGetVehicleInformationForUserTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:" + randomServerPort + "/getVehicleInformation?user=juliaBecker";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("inVehicleData"));
  }

  @Test
  void frontendRestControllerGetVehicleInformationForSingleVinTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:"
            + randomServerPort
            + "/getVehicleInformation?user=juliaBecker&vin=V1RTUALV1N0000001";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("inVehicleData"));
    assertTrue(Objects.requireNonNull(result.getBody()).contains("V1RTUALV1N0000004"));
  }

  @Test
  void frontendRestControllerGetVehicleInformationWrongVinTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:"
            + randomServerPort
            + "/getVehicleInformation?user=juliaBecker&vin=V1RTUALV1N000000X";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("inVehicleData"));
    assertTrue(Objects.requireNonNull(result.getBody()).contains("V1RTUALV1N0000004"));
  }

  @Test
  void frontendRestControllerGetVehicleInformationInvalidUserTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:" + randomServerPort + "/getVehicleInformation?user=xyz";
    URI uri = new URI(baseUri);
    assertThrows(
        HttpServerErrorException.class, () -> restTemplate.getForEntity(uri, String.class));
  }

  @Test
  void frontendRestControllerGetRequestListTest() throws URISyntaxException {
    List<HelpRequest> requestList = HelpRequestList.getInstance().getRequestList();
    requestList.add(new HelpRequest(null, null, null, 0));
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri = "http://localhost:" + randomServerPort + "/getRequestList";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("driver"));
  }

  @Test
  void frontendRestControllerGetAllServiceVehiclesTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri = "http://localhost:" + randomServerPort + "/getAllServiceVehicles";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("carData"));
  }

  @Test
  void frontendRestControllerGetUserInfoTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri = "http://localhost:" + randomServerPort + "/getUserInfo?user=juliaBecker";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("user"));
    assertTrue(Objects.requireNonNull(result.getBody()).contains("juliaBecker"));
  }

  @Test
  void frontendRestControllerUpdateAvailabilityToggleTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:"
            + randomServerPort
            + "/updateAvailability?reqId=0&vin=V1RTUALV1N0000001";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("false"));
    result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("true"));
  }

  @Test
  void frontendRestControllerUpdateAvailabilityUnknownVinTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:"
            + randomServerPort
            + "/updateAvailability?reqId=0&vin=V1RTUALV1N000000X";
    URI uri = new URI(baseUri);
    assertThrows(
        HttpServerErrorException.class, () -> restTemplate.getForEntity(uri, String.class));
  }

  @Test
  void frontendRestControllerGetAssignedServiceVehicleTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    String baseUri =
        "http://localhost:"
            + randomServerPort
            + "/updateAvailability?reqId=0&vin=V1RTUALV1N0000001";
    URI uri = new URI(baseUri);
    ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
    baseUri = "http://localhost:" + randomServerPort + "/getAssignedServiceVehicle?reqId=0";
    uri = new URI(baseUri);
    result = restTemplate.getForEntity(uri, String.class);
    System.out.println(result.getBody());
    assertEquals(200, result.getStatusCodeValue());
    assertTrue(Objects.requireNonNull(result.getBody()).contains("V1RTUALV1N0000001"));
  }

  @Test
  void frontendRestControllerGetAssignedServiceVehicleUnknownReqIdTest() throws URISyntaxException {
    RestTemplate restTemplate = new RestTemplate();
    final String baseUri =
        "http://localhost:" + randomServerPort + "/getAssignedServiceVehicle?reqId=-1";
    URI uri = new URI(baseUri);
    assertThrows(
        HttpServerErrorException.class, () -> restTemplate.getForEntity(uri, String.class));
  }
}
