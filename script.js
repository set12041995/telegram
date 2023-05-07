const body = $("body");
const imageDiv = $("<div></div>");
const image = $("<img>")
  .attr("src", "https://mc-astro.github.io/tesla-roadster-colors/img/black.jpg")
  .css({ width: "100%" });

const title = $("<div></div>")
  .text("Solid Black")
  .css({ textAlign: "center", margin: "20px", color: "#cccccc" });

const colorsWrap = $("<div></div>")
  .addClass("colorsWrap")
  .css({ justifyContent: "center", display: "flex" });

body.append(imageDiv, title, colorsWrap);
imageDiv.prepend(image);

let getData = async () => {
  try {
    const response = await $.ajax({
      url: "https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json",
      method: "GET",
      dataType: "JSON",
    });

    const data = response;

    $.each(data, function(index, item) {
      const color = $("<div></div>")
        .addClass("color")
        .css({
          backgroundColor: item.color,
          width: "25px",
          height: "35px",
          borderRadius: "2px",
          cursor: "pointer",
          margin: "1px 2px",
          display: "inline-block",
        })
        .data({
          img: item.img,
          title: item.title,
        });
      colorsWrap.append(color);
    });

    colorsWrap.on("click", ".color", function(e) {
      const img = $(this).data("img");
      const text = $(this).data("title");

      $(".color").css({
        boxShadow: "none",
        marginTop: "0px",
      });

      $(this).css({
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15)",
        marginTop: "-5px",
      });

      image.attr(
        "src",
        `https://mc-astro.github.io/tesla-roadster-colors/img/${img}.jpg`
      );

      title.text(text);
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
