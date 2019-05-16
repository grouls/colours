const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");
const cssColors = require("./data/css-colors.json");

const colors = [];
settings.dataSets.forEach(key => {
  try {
    const body = fs.readFileSync(`${__dirname}/data/${key}.html`, "UTF-8");
    const $ = cheerio.load(body);
    const table = $("table caption").parent();
    const tableDataTrs = $(table).find("tbody tr");

    tableDataTrs.each((i, tr) => {
      const data = $(tr)
        .children()
        .toArray()
        .map(td =>
          $(td)
            .text()
            .trim()
        );
      const [name, hex, r, g, b, sortHue, sat1, lum] = data;

      const hueDeg = sortHue.split("♠")[1] || "0°";
      const h = hueDeg.substring(0, hueDeg.length - 1);
      const s = sat1.substring(0, sat1.length - 1);
      const l = lum.substring(0, lum.length - 1);
      if (hex.startsWith("#") && !colors.find(color => color.hex === hex)) {
        colors.push({
          name,
          hex,
          rgb: {
            r,
            g,
            b,
          },
          sortHue,
          hsl: {
            h,
            s,
            l,
          },
        });

        console.log("pushed", name);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

const colWithCssMatch = colors.map(color => {
  const cssMatch = cssColors.find(cssColor => {
    const [name, hex] = cssColor;
    return color.hex === hex;
  });
  if (cssMatch) {
    const [name] = cssMatch;
    color.cssName = name;
  }
  return color;
});

const html = fs.readFileSync(`${__dirname}/../public/index.html`);
const $ = cheerio.load(html);
$("#data").text(JSON.stringify(colWithCssMatch));
fs.writeFileSync(`${__dirname}/../public/index.html`, $.html(), "UTF-8");
