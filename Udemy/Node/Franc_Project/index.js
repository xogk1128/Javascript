import {franc, francAll} from 'franc'
import lang from 'langs'

const input = process.argv[2];
const langCode = franc(input);
if(langCode === 'und'){
    console.log("SORRY, COULDN'T FIQURE IT OUT!");
}
else {
    const language = lang.where("3", langCode);
    console.log(`Our best guess is ${language.name}`);
}
