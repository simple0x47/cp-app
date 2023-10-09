import { AfterViewInit, Component, Input } from '@angular/core';
import { Image } from './image';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ImageLimits } from "./image-limits";
import { imageCountValidator } from './images-uploader-validation';
import { v4 } from 'uuid';

const ALLOWED_IMAGE_MIME_TYPES: string[] = ["image/png", "image/jpeg", "image/webp"];

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.css']
})
export class ImagesUploaderComponent implements AfterViewInit {
  @Input()
  public attributeId: string = "";

  /**
   * Id which is prefixed with 'id' in order to assure the ID is a valid HTML ID, since these
   * ids must always start with a letter.
   */
  public instanceId: string = `id-${v4()}`;

  @Input()
  public label: string = "";

  /**
   * String containing the lower and upper limits of the amount of images that can be uploaded.
   * Also, the maximum image size allowed is contained.
   * This is the structure that must be used: `images#minimum,maximum,maximumImageSizeInBytes`,
   * i.e. `images#1,2,500000`.
   */
  @Input()
  public limitsConfig: string = "";

  @Input()
  public formValidated: boolean = false;

  public limits: ImageLimits = ImageLimits.buildImageLimitsFromConfig("images#1,8,500000")!;

  public images: Image[];
  public control: FormControl<Image[] | null>;
  private _uploadedHashes: Map<string, boolean>;

  public constructor(
    private _snackBar: MatSnackBar
  ) {
    this.images = [];
    this._uploadedHashes = new Map();
    this.control = new FormControl(null);
  }

  public selectFile() {
    const input = document.querySelector(`#${this.instanceId}`)?.querySelector('input');

    if (!input) {
      return;
    }

    input.click();
  }

  public onFileChange(event: any) {
    if (!event.target) {
      return;
    }

    if (!event.target.files) {
      return;
    }

    if (event.target.files.length === 0) {
      return;
    }

    const file: File = event.target.files[0];

    // Reset input.
    const input = document.querySelector(`#${this.instanceId}`)?.querySelector('input');

    if (input) {
      input.value = "";
    }

    if (this.isImageTypeInvalid(file)) {
      return;
    }

    if (file.size > this.limits.maximumImageSize) {
      this._snackBar.open($localize`Image exceeds the size limit of ${this.limits.maximumImageSize / 1000000} MB.`, $localize`Ok`);
      return;
    }

    Image.readFromFile$(file).pipe(first()).subscribe(result => {
      if (result.isErr()) {
        const error = result.unwrapErr();

        if (error === null) {
          return;
        }

        this._snackBar.open(error, $localize`Ok`);
        return;
      }

      const image = result.unwrap();

      if (image === null) {
        return;
      }

      if (this.isImageAlreadyUploaded(image)) {
        this._snackBar.open($localize`You cannot upload the same image twice.`, $localize`Ok`);
        return;
      }

      this.images.push(image);

      if (this.images.length === 1) {
        this.control.setValue(this.images);
      }


    });
  }

  public removeImage(index: number) {
    if (index >= this.images.length) {
      console.log("Tried to remove an image out of bounds.");
      return;
    }

    const image = this.images.at(index);

    if (!image) {
      return;
    }

    this._uploadedHashes.delete(image.hash);
    this.images.splice(index, 1);

    if (this.images.length === 0) {
      this.control.setValue(null);
    }
  }

  public ngAfterViewInit(): void {
    if (this.limitsConfig.length === 0) {
      return;
    }

    const limits = ImageLimits.buildImageLimitsFromConfig(this.limitsConfig);

    if (!limits) {
      return;
    }

    this.limits = limits;
    this.control.addValidators(imageCountValidator(limits.minimum, limits.maximum));
  }

  public getErrorMessage(): string {
    return "";
  }

  private isImageTypeInvalid(file: File): boolean {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      this._snackBar.open($localize`You can only upload JPEG, PNG and WEBP images.`, $localize`Ok`);

      return true;
    }

    return false;
  }

  private isImageAlreadyUploaded(image: Image): boolean {
    for (const otherImage of this.images) {
      if (otherImage.hash === image.hash) {
        return true;
      }
    }

    return false;
  }
}
