/* eslint-disable */export default{languageData:{"plurals":function(n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return n==1&&v0?"one":v0&&i10>=2&&i10<=4&&(i100<12||i100>14)?"few":v0&&i!=1&&(i10==0||i10==1)||v0&&i10>=5&&i10<=9||v0&&i100>=12&&i100<=14?"many":"other"}},messages:{"Comment":"Komentarz","Details":"Szczeg\xF3\u0142y","Drag and drop or click to upload.":"Upusc plik lub kliknij by wczytac paragon.","Failed to load details":"B\u0142\u0105d przy wczytywaniu szczeg\xF3\u0142\xF3w.","Failed to load expenses.":"B\u0142\u0105d przy wczytywaniu wydatk\xF3w.","Go on, drop it!":"No dalej, upusc plik!","Next Page":"Nast\u0119pna strona","Prev Page":"Poprzednia strona","Receipts":"Paragony","Save Comment":"Zapisz Komentarz","Saving comment failed! Please, try again":"B\u0142\u0105d przy zapisywaniu komentarza. Spr\xF3buj ponownie!","Try again":"Spr\xF3buj ponownie","to {merchant}":function(a){return["dla ",a("merchant")]}}};