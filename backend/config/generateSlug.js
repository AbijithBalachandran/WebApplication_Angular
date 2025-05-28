
const slugify = require('slugify');
const student = require('../models/student');

async function generateSlug (name) {
    let baseSlug = slugify(name,{lower:true});
    let slug = baseSlug;
    let count = 1;



while(await student.exists({slug})){
     slug = `${baseSlug}-${count}`;
     count++;
}

return slug;

}

module.exports = generateSlug;