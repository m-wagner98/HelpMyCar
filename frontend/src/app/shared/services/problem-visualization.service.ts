import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemVisualizationService {

  private highlightedPart = '';
  private currentVisualizationIndex = 0;
  private CarPartIdMap = new Map<string, string>()
    .set('P0700', 'transmission')
    .set('P0217', 'engine')
    .set('P0219', 'engine')
    .set('P0298', 'engine')
    .set('P0517', 'battery');
  private descriptionMap = new Map<string, string>()
    .set('P0700', 'Transmission Control System')
    .set('P0217', 'Engine Coolant Over Temperature Condition')
    .set('P0219', 'Engine Overspeed Condition')
    .set('P0298', 'Engine Oil Over Temperature')
    .set('P0517', 'Battery Temperature Sensor Circuit High');
  private CarPartIdDescriptionMap = new Map<string, string>()
    .set('transmission', 'Transmission')
    .set('engine', 'Engine')
    .set('battery', 'Battery');
  private status = new BehaviorSubject<string>('');
  private partHighlightedInVisualization = new BehaviorSubject<string>('');

  constructor() {
  }

  highlightDamage(carPartId: string, highlightAll: boolean) {
    // if part is already highlighted no need to highlight it
    if (this.isPartHighlighted(carPartId) || !carPartId) {
      return;
    }
    this.highlightedPart = carPartId;
    if (highlightAll) {
      this.partHighlightedInVisualization.next(carPartId);
    } else {
      this.status.next(carPartId);
    }
    const description = document.getElementById('description');
    const svgElement: HTMLElement = document.getElementById(carPartId + '-' + this.currentVisualizationIndex);
    const boundingClient: DOMRect = svgElement.getBoundingClientRect();

    svgElement.style.strokeWidth = '5px';

    description.style.display = 'block';
    description.innerHTML = this.getTranslationByCarPartId(carPartId);
    description.style.top = boundingClient.top + boundingClient.height + 10 + 'px';
    description.style.left = boundingClient.left - ((description.offsetWidth - boundingClient.width) / 2) + 'px';
  }

  stopHighlightingDamage(carPartId: string) {
    // if part is not highlighted no need to stop highlighting it
    if (this.highlightedPart !== carPartId || !carPartId) {
      return;
    }
    this.highlightedPart = '';
    this.status.next('');
    this.partHighlightedInVisualization.next('');
    const description = document.getElementById('description');
    const svgElement: HTMLElement = document.getElementById(carPartId + '-' + this.currentVisualizationIndex);

    svgElement.style.strokeWidth = '2px';
    description.style.display = 'none';
  }

  /**
   * Check if a part is already being highlighted. If no part id is given it return whether any part is selected
   * @param carPartId unique string identifier
   */
  isPartHighlighted(carPartId?: string): boolean {
    if (carPartId) {
      return this.highlightedPart === carPartId;
    } else {
      return this.highlightedPart !== '';
    }
  }

  onSlideChange(n: number) {
    this.currentVisualizationIndex = n;
    if (this.isPartHighlighted()) {
      this.stopHighlightingDamage(this.highlightedPart);
    }
  }

  getTranslationByDtc(dtc: string): string {
    return this.descriptionMap.get(dtc);
  }

  getTranslationByCarPartId(carPartId: string) {
    return this.CarPartIdDescriptionMap.get(carPartId);
  }

  getCarPartIdByDtc(dtc: string): string {
    return this.CarPartIdMap.get(dtc);
  }

  subscribeToChanges(): Observable<string> {
    return this.status.asObservable();
  }

  subscribeToVisualizationChanges(): Observable<string> {
    return this.partHighlightedInVisualization.asObservable();
  }
}
