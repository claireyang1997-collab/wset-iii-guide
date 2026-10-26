// Source: supplied textbook p.76, figure 7.8. Keep only the five closures;
// the complete original caption is selectable text in winemaking.json.
const sharp = require('sharp');
const path = require('path');
if (!process.argv[2]) throw Error('Pass the original p.76 photograph path.');
sharp(process.argv[2]).autoOrient()
 .extract({left:360,top:1490,width:2300,height:850})
 .resize({width:1800}).webp({quality:92})
 .toFile(path.join(__dirname,'../dist/assets/photo-closures.webp'))
 .catch(e=>{console.error(e);process.exitCode=1;});
