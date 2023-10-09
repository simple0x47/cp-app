import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {GoogleMap} from '@angular/google-maps';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {first} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-map-area-selector',
  templateUrl: './map-area-selector.component.html',
  styleUrls: ['./map-area-selector.component.css']
})
export class MapAreaSelectorComponent implements AfterViewInit {

  public mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    streetViewControl: false,
    zoom: 6,
    center: {lat: 0, lng: 0},
  }

  public windowInnerWidth: number = window.innerWidth;
  public selectedPolygon: google.maps.Polygon | null = null;
  public control: FormControl<google.maps.Polygon[] | null> = new FormControl(null);
  @ViewChild(GoogleMap)
  private _googleMap: GoogleMap | null = null;
  private _drawingManager: google.maps.drawing.DrawingManager | null = null;
  private _polygons: google.maps.Polygon[] = [];

  public constructor(
    private _changeDetector: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {

  }

  public ngAfterViewInit(): void {
    const map = this._googleMap?.googleMap;

    if (!map) {
      return;
    }

    const drawingOptions: google.maps.drawing.DrawingManagerOptions = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        clickable: true,
        strokeColor: "#424242",
        strokeOpacity: 0.95,
        fillColor: "#9E9E9E",
        fillOpacity: 0.5
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    }

    this._drawingManager = new google.maps.drawing.DrawingManager(drawingOptions);

    this._drawingManager.setMap(map);

    this.listenToMapEvents(map);
    this.listenToDrawingManagerEvents();
  }

  public clearMap() {
    const confirmDialogRef = this._dialog.open(ConfirmDialogComponent);

    confirmDialogRef.afterClosed().pipe(first()).subscribe(
      value => {
        if (value) {
          this.control.setValue(null);

          this.deselectPolygon();

          for (const polygon of this._polygons) {
            polygon.setMap(null);
          }

          this._polygons = [];
        }
      }
    );
  }

  public removeSelectedPolygon() {
    // Remove by switching place with last item.
    for (let i = 0; i < this._polygons.length; i++) {
      const polygon = this._polygons[i];

      if (polygon === this.selectedPolygon) {
        this._polygons[i] = this._polygons[this._polygons.length - 1];
        break;
      }
    }

    this._polygons.pop();

    this.selectedPolygon?.setMap(null);

    this.selectedPolygon = null;

    this._changeDetector.detectChanges();
  }

  private listenToDrawingManagerEvents() {
    if (!this._drawingManager) {
      return;
    }

    google.maps.event.addListener(this._drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type != google.maps.drawing.OverlayType.MARKER) {
        this._drawingManager?.setDrawingMode(null);
        this._polygons.push(event.overlay);

        this.control.setValue(this._polygons);

        google.maps.event.addListener(event.overlay, 'click', (click: any) => {
          if (this.selectedPolygon) {
            this.deselectPolygon();
          }

          this.selectedPolygon = event.overlay;

          this.selectPolygon(event.overlay);
        });
      }
    });
  }

  private listenToMapEvents(map: google.maps.Map) {
    google.maps.event.addListener(map, 'click', (event: any) => {
      this.deselectPolygon();
    });
  }

  private deselectPolygon() {
    this.selectedPolygon?.setOptions({
      draggable: true,
      editable: true,
      clickable: true,
      strokeColor: "#424242",
      strokeOpacity: 0.95,
      fillColor: "#9E9E9E",
      fillOpacity: 0.5
    });

    this.selectedPolygon = null;

    this._changeDetector.detectChanges();
  }

  private selectPolygon(polygon: google.maps.Polygon) {
    polygon.setOptions({
      draggable: true,
      editable: true,
      clickable: true,
      strokeColor: "#2196F3",
      strokeOpacity: 0.95,
      fillColor: "#64B5F6",
      fillOpacity: 0.5
    });

    this.selectedPolygon = polygon;

    this._changeDetector.detectChanges();
  }
}
