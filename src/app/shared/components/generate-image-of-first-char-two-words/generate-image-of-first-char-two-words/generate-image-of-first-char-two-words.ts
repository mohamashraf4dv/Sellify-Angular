import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-generate-image-of-first-char-two-words',
  imports: [],
  templateUrl: './generate-image-of-first-char-two-words.html',
  styleUrl: './generate-image-of-first-char-two-words.scss',
})
export class GenerateImageOfFirstCharTwoWords {

  name = input<string|undefined>();
  userImage = computed(()=> this.mapNameForImage(this.name()));

  mapNameForImage(name:string|undefined):string{
    if(name == undefined)
      return "U K";
    const nameinArr= name.split(" ");
    const firstChar= nameinArr[0][0].toUpperCase();
    const secondChar= nameinArr[1][0].toUpperCase();
    return `${firstChar} ${secondChar}`;
  }

}
