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
      {
        faceValue: 1,
        paired: false,
        img: "https://i.ibb.co/fDWsn3G/buck.jpg"
      },
      { faceValue: 4, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uubegfz4DJo7a5J09XOv-8w3Aoy6pQ5znQ&usqp=CAU" },
      { faceValue: 2, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8luT30NsabgYTTP_YthEw_YBiPPIX7M_AeA&usqp=CAU" },
      { faceValue: 3, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhmrs4J4mgWfNnGfMhxJUu4j-oRQonl0rUQ&usqp=CAU" }
    ],
    [
      { faceValue: 12, paired: false, img: "https://i.ibb.co/fDWsn3G/buck.jpg" },
      { faceValue: 9, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uubegfz4DJo7a5J09XOv-8w3Aoy6pQ5znQ&usqp=CAU" },
      { faceValue: 11, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8luT30NsabgYTTP_YthEw_YBiPPIX7M_AeA&usqp=CAU" },
      { faceValue: 10, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhmrs4J4mgWfNnGfMhxJUu4j-oRQonl0rUQ&usqp=CAU" }
    ],
    [
      { faceValue: 5, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFAX8OUkjXMyYiXQEdmL0qnbY6jEmhv0qGQ&usqp=CAU" },
      { faceValue: 6, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsoRGF4nNnlFkRVUZCQoX9jN5zkbZkZWqsA&usqp=CAU" },
      { faceValue: 7, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsoRGF4nNnlFkRVUZCQoX9jN5zkbZkZWqsA&usqp=CAU" },
      { faceValue: 8, paired: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFAX8OUkjXMyYiXQEdmL0qnbY6jEmhv0qGQ&usqp=CAU" }
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
          "congrats  attempts" +
            this.attempt +
            " Time taken to complete" +
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
