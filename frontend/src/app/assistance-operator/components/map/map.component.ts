import { Component, Input, OnInit } from '@angular/core';
import { HelpRequest } from 'src/app/shared/model/HelpRequest';
import { HelpRequestInformationService } from '../../services/help-request-information.service';
import { VehicleInformationService } from '../../../shared/services/vehicle-information.service';
import { ServiceVehicle } from '../../model/service-vehicle';
import { MapService } from '../../services/map.service';
import { DistanceGeoCodingService } from '../../../shared/services/distance-geo-coding.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // Styling of the embedded Google Map
  googleMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e'
        }
      ]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c'
        }
      ]
    }
  ];

  public driverMapBounds: boolean;
  private iconWidth = 50;
  private iconHeight = 50;
  public markerIconDriver = {
    url: 'assets/driver_map_icon.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };
  public markerIconServiceVehicle = {
    url: 'assets/onsite_vehicle_map_icon.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };
  public markerIconTowingVehicle = {
    url: 'assets/towing_vehicle_map_icon.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };
  public markerIconSelectedServiceVehicle = {
    url: 'assets/onsite_vehicle_map_icon_red_stroke.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };
  public helpRequest: HelpRequest;
  public driverLat: number;
  public driverLng: number;
  public markerIconSelectedTowingVehicle = {
    url: 'assets/towing_vehicle_map_icon_red_stroke.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };

  public toggeled = false; // update markers uses this to see, if the service vehicle list is filtered or not
  public serviceVehicleMarkers: ServiceVehicleMarker[] = [];
  private map: AgmMap;

  constructor(private helpRequestInformationService: HelpRequestInformationService,
    private vehicleInformationService: VehicleInformationService,
    private mapService: MapService,
    private distanceService: DistanceGeoCodingService,
  ) {
  }

  @Input('id') set _id(value: number) {
    this.helpRequest = this.helpRequestInformationService.getRequest(value);
    this.driverLat = this.helpRequest.apiResponse.inVehicleData[0].response.geolocation.dataPoint.latitude;
    this.driverLng = this.helpRequest.apiResponse.inVehicleData[0].response.geolocation.dataPoint.longitude;
  }

  ngOnInit(): void {
    this.getServiceVehicles();
    this.subscribeToSelectedServiceVehicles();
    this.subscribeToToggle();
  }

  /**
   * Gets all ServiceVehicles and calculates the distance from the driver.
   */
  getServiceVehicles() {
    this.vehicleInformationService.getAllServiceVehicles().subscribe((response: ServiceVehicle[]) => {
      for (const serviceVehicle of response) {
        serviceVehicle.distance = this.distanceService.calculateDistance(
          this.helpRequest.apiResponse.inVehicleData[0].response.geolocation.dataPoint,
          serviceVehicle.carData.geolocation.dataPoint);
        this.createMapMarker(serviceVehicle);
      }
    });
  }

  /**
   * Creates a map marker for the given ServiceVehicle.
   * @param serviceVehicle for which a map marker is created.
   */
  createMapMarker(serviceVehicle: ServiceVehicle) {
    this.serviceVehicleMarkers.push({
      serviceVehicle: serviceVehicle,
      icon: serviceVehicle.type === 'ON_SITE_VEHICLE' ? this.markerIconServiceVehicle : this.markerIconTowingVehicle,
      fitMapBounds: true,
      visible: true
    });
  }

  subscribeToSelectedServiceVehicles() {
    this.mapService.getSelectedVehicle().subscribe((vehicle) => {
      if (vehicle === undefined) {
        this.resetMarkers();
      } else {
        this.updateMarkers(vehicle);
      }
    });
  }

  subscribeToToggle() {
    this.mapService.getToggle().subscribe((criteria) => {
      this.updateToggle(criteria);
    });
  }

  /**
   * Centers the map on the driver and the selected ServiceVehicle.
   * Hides other ServiceVehicleMarkers depending on their availability and the status of the HelpRequest.
   */
  updateMarkers(selectedVehicle: ServiceVehicle) {
    this.driverMapBounds = undefined;
    for (const marker of this.serviceVehicleMarkers) {
      if (marker.serviceVehicle.vin === selectedVehicle.vin) {
        marker.icon = marker.serviceVehicle.type === 'ON_SITE_VEHICLE' ? this.markerIconSelectedServiceVehicle : this.markerIconSelectedTowingVehicle;
        marker.fitMapBounds = true;
        marker.visible = true;
      } else {
        // For HelpRequests with the status 'IN_PROGRESS' the ServiceVehicleMarkers of ServiceVehicles that aren't
        // selected are visible, but the map doesn't set it's bounds according to them.
        if (this.vehicleInformationService.checkIfServiceVehicleIsAvailable(marker.serviceVehicle.vin) && this.helpRequest.status === 'IN_PROGRESS') {
          marker.fitMapBounds = false;
          // if the list is filtered, hide service vehicles which are not the same type as the selected vehicle, which
          // means they are not shown in the list at the moment because of the filter
          marker.visible = this.toggeled && marker.serviceVehicle.type === selectedVehicle.type || !this.toggeled;
        }
        // If the ServiceVehicle is not available or the HelpRequest has a status other than 'IN_PROGRESS',
        // the marker gets hidden.
        else {
          marker.visible = false;
          marker.fitMapBounds = false;
        }
        marker.icon = marker.serviceVehicle.type === 'ON_SITE_VEHICLE' ? this.markerIconServiceVehicle : this.markerIconTowingVehicle;
      }
    }
    this.resizeMap();
  }

  /**
   * Makes all ServiceVehicleMarkers visible and centers the map on them, if the corresponding ServiceVehicle
   * is available.
   */
  resetMarkers() {
    this.driverMapBounds = undefined;
    this.toggeled = false;
    for (const marker of this.serviceVehicleMarkers) {
      if (this.vehicleInformationService.checkIfServiceVehicleIsAvailable(marker.serviceVehicle.vin)) {
        marker.visible = true;
        marker.fitMapBounds = true;
        marker.icon = marker.serviceVehicle.type === 'ON_SITE_VEHICLE' ? this.markerIconServiceVehicle : this.markerIconTowingVehicle;
      } else {
        marker.visible = false;
        marker.fitMapBounds = false;
      }
    }
    this.resizeMap();
  }

  updateToggle(criteria: string) {
    this.driverMapBounds = undefined;
    this.toggeled = true;
    for (const marker of this.serviceVehicleMarkers) {
      if (marker.serviceVehicle.type === criteria && this.vehicleInformationService.checkIfServiceVehicleIsAvailable(marker.serviceVehicle.vin)) {
        marker.visible = true;
        marker.fitMapBounds = true;
        marker.icon = marker.serviceVehicle.type === 'ON_SITE_VEHICLE' ? this.markerIconServiceVehicle : this.markerIconTowingVehicle;
      } else {
        marker.visible = false;
        marker.fitMapBounds = false;
      }
    }
    this.resizeMap();
  }


  // fits the driver map marker back into the map bounds and triggers a resize of the map.
  resizeMap() {
    setTimeout(() => {
      this.driverMapBounds = true;
      if (this.map) {
        this.map.triggerResize(true);
      }
    }, 1);
  }

  onReady(map: AgmMap) {
    this.map = map;
  }

  mapSelect(serviceVehicle: ServiceVehicle): void {
    if (this.helpRequest.status === 'IN_PROGRESS') {
      this.mapService.updateMapSelect(serviceVehicle === undefined ? undefined : serviceVehicle);
    }
  }

}

interface ServiceVehicleMarker {
  serviceVehicle: ServiceVehicle;
  icon: any;
  fitMapBounds: boolean;
  visible: boolean;
}
