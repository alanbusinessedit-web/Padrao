import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Montserrat (SIL Open Font License) incluída em public/fonts, para renderizar
// sem depender de internet.
export const fontFamily = "Montserrat";

for (const peso of ["600", "800", "900"]) {
  loadFont({ family: fontFamily, url: staticFile(`fonts/Montserrat-${peso}.ttf`), weight: peso });
}
