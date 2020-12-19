import { Component, Renderer2 } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  selectedElements = [];
  attempt = 0;
  start;

  tiles = [
    [
      { faceValue: 1, paired: false, img:'assests/images/gray-mountain.jpg' },
      { faceValue: 4, paired: false, img:'assests/images/green-mountain.jpg' },
      { faceValue: 2, paired: false, img:'assests/images/mountain.jpg' },
      { faceValue: 3, paired: false, img:'assests/images/peak-mountain.jpg' }
    ],
    [
      { faceValue: 12, paired: false, img:'assests/images/gray-mountain.jpg' },
      { faceValue: 9, paired: false, img:'assests/images/green-mountain.jpg' },
      { faceValue: 11, paired: false, img:'assests/images/mountain.jpg' },
      { faceValue: 10, paired: false, img:'assests/images/peak-mountain.jpg' }
    ],
    [
      { faceValue: 5, paired: false, img:'assests/images/snow-mountain.jpg' },
      { faceValue: 6, paired: false, img:'assests/images/white-mountain.jpg' },
      { faceValue: 7, paired: false, img:'assests/images/white-mountain.jpg' },
      { faceValue: 8, paired: false, img:'assests/images/snow-mountain.jpg' }
    ]
  ];

  constructor(private renderer: Renderer2) {}

  flip(i, j, card) {
    if (this.attempt === 0) this.start = Date.now();
    this.attempt++;

    if (this.tiles[i][j].paired) return;

    if (this.selectedElements.length === 0) {
      this.selectedElements.push(this.tiles[i][j], card);
      this.renderer.addClass(card, "flipped");
      return;
    }

    if (this.tiles[i][j].faceValue === this.selectedElements[0].faceValue) {
      this.renderer.removeClass(this.selectedElements[1], "flipped");
      this.selectedElements = [];
      return;
    }

    if (
      this.tiles[i][j].faceValue + this.selectedElements[0].faceValue ===
      this.tiles.length * this.tiles[0].length + 1
    ) {
      this.renderer.addClass(card, "flipped");
      this.tiles[i][j].paired = true;
      this.selectedElements[0].paired = true;
      this.selectedElements = [];

      if (this.tiles.every(row => row.every(tile => tile.paired))) {
        alert(
          "congrats " +
            this.attempt +
            " " +
            (Date.now() - this.start) / 1000 +
            "s"
        );
      }
    } else {
      this.renderer.removeClass(this.selectedElements[1], "flipped");
      this.selectedElements = [];
    }
  }
}
