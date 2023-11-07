import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.css'],
})
export class InitialsAvatarComponent implements AfterViewInit {
  @Input()
  public text: string = '#';

  @Input()
  public width: string = '64px';

  @Input()
  public height: string = '64px';

  @ViewChild('avatarInitials')
  private _avatarInitials: ElementRef<HTMLElement> | null = null;

  private _colors: string[] = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d',
  ];

  public ngAfterViewInit() {
    if (this.text.length == 0) {
      this.text = '#';
    }

    let letter = this.text.charAt(0);
    let textSum = 0;

    for (const char of this.text) {
      textSum += char.charCodeAt(0);
    }

    let colorIndex = textSum % 19;

    if (!this._avatarInitials) {
      return;
    }

    let style = this._avatarInitials.nativeElement.style;

    const height: number | null = this.parseSize(this.height);

    if (height == null) {
      return;
    }

    style.backgroundColor = this._colors[colorIndex];
    style.width = this.width;
    style.height = this.height;
    style.font = height / 2 + 'px Arial';
    style.color = '#FFF';
    style.textAlign = 'center';
    style.lineHeight = height + 'px';
    style.borderRadius = '50%';

    this._avatarInitials.nativeElement.textContent = letter;
  }

  private parseSize(sizeString: string): number | null {
    const sizeValue = parseFloat(sizeString);

    if (isNaN(sizeValue)) {
      return null;
    }

    let sizeValueEnd = 0;

    for (const char of sizeString) {
      if (char >= '0' && char <= '9') {
        sizeValueEnd += 1;
      } else {
        break;
      }
    }

    const sizeUnit = sizeString.substring(sizeValueEnd);

    const tempElement = document.createElement('div');
    tempElement.style.width = '1' + sizeUnit;
    document.body.appendChild(tempElement);
    const pixels = tempElement.offsetWidth;
    document.body.removeChild(tempElement);

    return sizeValue * pixels;
  }
}
