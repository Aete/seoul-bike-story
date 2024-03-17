function interactive_data_viz(p) {
  p.setup = function () {
    p.createCanvas(100, 100);
    p.background("#212121");
  };
  p.draw = function () {};
}

new p5(interactive_data_viz, "story");
